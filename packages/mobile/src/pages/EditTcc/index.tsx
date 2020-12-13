import React, { useRef, useCallback, useState, useEffect } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  StyledPicker,
  Header,
  HeaderTitle,
  BackButton
} from './styles'
import Icon from 'react-native-vector-icons/Feather'

interface EditTccFormData {
  description: string
  suggestion: string
  links: string
}

interface Params {
  tcc_id: string
}

interface Creator {
  type: string
}

interface Tcc {
  suggestion: string
  description: string
  area: string
  links: string
  course: string
  creator: Creator
}

const EditTcc: React.FC = () => {
  const [tcc, setTcc] = useState({} as Tcc)
  const [area, setArea] = useState<string | undefined>(undefined)
  const [course, setCourse] = useState<string | undefined>(undefined)

  const { params } = useRoute()
  const { tcc_id } = params as Params

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const descriptionInputRef = useRef<TextInput>(null)
  const linksInputRef = useRef<TextInput>(null)

  useEffect(() => {
    async function getTcc() {
      const response = await api.get(`tccs/${tcc_id}`)

      setTcc(response.data)
      if (!area) setArea(tcc.area)
      if (!course) setCourse(tcc.course)
    }

    getTcc()
  }, [tcc, tcc_id, area, course])

  const handleEditTcc = useCallback(
    async (data: EditTccFormData) => {
      try {
        formRef.current?.setErrors({})

        const requestData = {
          suggestion: data.suggestion || tcc.suggestion,
          links: data.links || tcc.links,
          description: data.description || tcc.description,
          area,
          course
        }

        const schema = Yup.object().shape({
          description: Yup.string().min(
            10,
            'Descrição deve ter no mínimo 10 dígitos'
          ),
          links: Yup.string().min(10, 'Links deve ter no mínimo 10 dígitos'),
          suggestion: Yup.string().min(
            8,
            'Sugestão deve ter no mínimo 8 dígitos'
          )
        })

        await schema.validate(requestData, {
          abortEarly: false
        })

        if (!area || !course) {
          Alert.alert(
            'Erro durante alteração',
            'Selecione todos os campos de seleção para continuar.'
          )
        }

        await api.put(`/tccs/${tcc_id}`, requestData)

        Alert.alert(
          'Alteração realizada com sucesso!',
          'As alterações foram salvas com sucesso!'
        )

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert('Erro no cadastro', err.response.data.message)
      }
    },
    [navigation, area, course, tcc_id, tcc]
  )

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#96CFF1" />
        </BackButton>

        <HeaderTitle>{tcc.suggestion}</HeaderTitle>
      </Header>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <View style={{ marginTop: 50 }}>
              <Title>Altere o TCC</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleEditTcc}
              style={{ width: '100%' }}
              initialData={tcc}
            >
              <StyledPicker
                selectedValue={course}
                onValueChange={(itemValue, itemIndex) => {
                  setCourse(itemValue ? String(itemValue) : undefined)
                }}
              >
                <StyledPicker.Item
                  label="Selecione o curso..."
                  value={undefined}
                />
                <StyledPicker.Item
                  label="Sistemas de Informação"
                  value="Sistemas de Informação"
                />
                <StyledPicker.Item
                  label="Ciências da Computação"
                  value="Ciências da Computação"
                />
              </StyledPicker>

              <StyledPicker
                selectedValue={area}
                onValueChange={(itemValue, itemIndex) => {
                  setArea(itemValue ? String(itemValue) : undefined)
                }}
              >
                <StyledPicker.Item
                  label="Selecione a área..."
                  value={undefined}
                />
                <StyledPicker.Item label="Big Data" value="Big Data" />
                <StyledPicker.Item
                  label="Engenharia de Software"
                  value="Engenharia de Software"
                />
              </StyledPicker>

              <Input
                autoCapitalize="words"
                name="suggestion"
                icon="user"
                placeholder="Sugestão"
                returnKeyType="next"
                onSubmitEditing={() => {
                  descriptionInputRef.current?.focus()
                }}
              />
              <Input
                ref={descriptionInputRef}
                autoCapitalize="words"
                name="description"
                icon="user"
                placeholder="Descrição"
                returnKeyType="next"
                onSubmitEditing={() => {
                  linksInputRef.current?.focus()
                }}
              />
              <Input
                ref={linksInputRef}
                autoCapitalize="words"
                name="links"
                icon="user"
                placeholder="Links"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Editar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default EditTcc
