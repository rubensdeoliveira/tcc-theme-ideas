import React, { useRef, useCallback, useState } from 'react'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, BackButton, Title, StyledPicker } from './styles'

interface EditProfileFormData {
  name: string
  surname: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuth()

  const [type, setType] = useState<string | undefined>(user.type)

  const formRef = useRef<FormHandles>(null)
  const surnameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleSubmit = useCallback(
    async (data: EditProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .min(6, 'No mínimo 6 dígitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
        })

        await schema.validate(data, { abortEarly: false })

        if (!type) {
          Alert.alert(
            'Erro ao atualizar o perfil',
            'Você precisa selecionar o tipo de usuário'
          )
          return
        }

        const {
          name,
          email,
          surname,
          old_password,
          password,
          password_confirmation
        } = data

        const formData = {
          name: name || user.name,
          surname: surname || user.surname,
          email: email || user.email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation
              }
            : {})
        }

        const response = await api.put('/profile', { ...formData, type })

        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')
        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
          return
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um error ao atualizar seu perfil, tente novamente.'
        )
      }
    },
    [navigation, updateUser, type, user]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#fff" />
            </BackButton>

            <View>
              <Title>Editar Perfil</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit} initialData={user}>
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
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => formRef.current?.submitForm()}
                style={{ marginTop: 10 }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default EditProfile
