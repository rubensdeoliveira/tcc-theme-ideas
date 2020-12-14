import React, { useCallback, useRef } from 'react'
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logo from '../../assets/logo.png'

import { Container, Title, BackToSign, BackToSignText } from './styles'
import api from '../../services/api'

interface RecoverFormData {
  email: string
}

const Recover: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const handleRecover = useCallback(
    async (data: RecoverFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/password/forgot', data)

        Alert.alert(
          'Sucesso',
          'Um e-mail de recuperação de senha foi enviado para o seu e-mail'
        )

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Erro ao enviar e-mail de recuperação',
          err.response.data.message ||
            'Ocorreu um erro ao enviar o e-mail de alteração de senha, tente novamente.'
        )
      }
    },
    [navigation]
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
            <Image source={logo} style={{ width: 120, height: 120 }} />

            <View style={{ height: 50, marginBottom: 15 }}>
              <Title>Recupere sua senha</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleRecover}
              style={{ width: '100%' }}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
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
                Recuperar
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

export default Recover
