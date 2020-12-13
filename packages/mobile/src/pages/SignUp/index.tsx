import React, { useRef, useCallback, useState } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
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
  BackToSign,
  BackToSignText,
  StyledPicker
} from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const SignUp: React.FC = () => {
  const [type, setType] = useState<string | undefined>(undefined)

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const surnameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(3, 'Nome deve ter no mínimo 3 dígitos'),
          surname: Yup.string().min(3, 'Nome deve ter no mínimo 3 dígitos'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string()
            .min(6, 'No mínimo 6 dígitos')
            .required('Campo obrigatório'),
          password_confirmation: Yup.string()
            .when('password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        if (!type) {
          Alert.alert(
            'Erro no cadastro',
            'Selecione um tipo de usuário para continuar.'
          )
          return
        }

        await api.post('/users', { ...data, type })

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Entre com suas informações para continuar'
        )

        navigation.goBack()
      } catch (err) {
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert('Erro no cadastro', err.message)
      }
    },
    [navigation, type]
  )

  return (
    <>
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
            <View style={{ marginTop: 60 }}>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <StyledPicker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => {
                  setType(itemValue ? String(itemValue) : undefined)
                }}
              >
                <StyledPicker.Item
                  label="Tipo de usuário..."
                  value={undefined}
                />
                <StyledPicker.Item label="Discente" value="Discente" />
                <StyledPicker.Item label="Docente" value="Docente" />
              </StyledPicker>

              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  surnameInputRef.current?.focus()
                }}
              />
              <Input
                ref={surnameInputRef}
                autoCapitalize="words"
                name="surname"
                icon="user"
                placeholder="Sobrenome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordConfirmationInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Repetir Senha"
                textContentType="newPassword"
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

      <BackToSign
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignText>Voltar para logon</BackToSignText>
      </BackToSign>
    </>
  )
}

export default SignUp
