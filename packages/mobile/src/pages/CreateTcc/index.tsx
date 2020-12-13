import React, { useRef, useCallback, useState } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

interface CreateTccFormData {
  suggestion: string
  description: string
  links: string
}

const CreateTcc: React.FC = () => {
  const [area, setArea] = useState<string | undefined>(undefined)
  const [course, setCourse] = useState<string | undefined>(undefined)

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const descriptionInputRef = useRef<TextInput>(null)
  const linksInputRef = useRef<TextInput>(null)

  const handleCreateTcc = useCallback(
    async (data: CreateTccFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          description: Yup.string().min(
            10,
            'Nome deve ter no mínimo 3 dígitos'
          ),
          links: Yup.string().min(10, 'Nome deve ter no mínimo 3 dígitos'),
          suggestion: Yup.string().min(8, 'Nome deve ter no mínimo 3 dígitos')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        if (!area || !course) {
          Alert.alert(
            'Erro no cadastro',
            'Selecione todos os campos de seleção para continuar.'
          )
        }

        await api.post('/tccs', { ...data, area, course })

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você cadastrou um novo tema de TCC na plataforma!'
        )

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert('Erro no cadastro', err.message)
      }
    },
    [navigation, area, course]
  )

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="chevron-left" size={24} color="#96CFF1" />
        </BackButton>

        <HeaderTitle>Temas para TCC</HeaderTitle>
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
              <Title>Cadastre um novo TCC</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleCreateTcc}
              style={{ width: '100%' }}
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
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default CreateTcc
