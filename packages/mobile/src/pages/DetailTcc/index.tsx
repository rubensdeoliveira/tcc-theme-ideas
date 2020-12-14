import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import {
  Container,
  ContainerText,
  ContainerButtons,
  IconButton,
  IconsContainer,
  Title,
  Info,
  BackButton,
  Button,
  ButtonText,
  Header,
  HeaderTitle
} from './styles'
import email from 'react-native-email'

interface Params {
  tcc_id: string
}

interface Creator {
  email: string
  type: string
}

interface Tcc {
  id: string
  suggestion: string
  description: string
  area: string
  links: string
  course: string
  creator: Creator
}

const DetailTcc: React.FC = () => {
  const [tcc, setTcc] = useState({} as Tcc)
  const [hasFavorited, setHasFavorited] = useState(false)
  const [isCreator, setIsCreator] = useState(false)

  const { user } = useAuth()

  const { params } = useRoute()
  const { tcc_id } = params as Params

  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      async function getTcc() {
        try {
          const [responseTcc, responseFavorites] = await Promise.all([
            api.get(`tccs/${tcc_id}`),
            api.get(`tccs/favorites/has-favorite?tcc_id=${tcc_id}`)
          ])

          const tcc = responseTcc.data

          if (tcc.user_id === user.id) {
            setIsCreator(true)
          }

          setTcc(responseTcc.data)
          setHasFavorited(responseFavorites.data)
        } catch (err) {
          console.error(err.response.data.message)
        }
      }

      getTcc()
    }, [tcc_id, user])
  )

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Deseja mesmo excluir esse tema?',
      'Essa operação não poderá ser desfeita.',
      [
        { text: 'Não' },
        {
          text: 'Sim',
          onPress: async () => {
            await api.delete(`tccs/${tcc_id}`)
            navigation.goBack()
          },
          style: 'cancel'
        }
      ]
    )
  }, [tcc_id, navigation])

  const handleFavorite = useCallback(async () => {
    try {
      await api.post('tccs/favorite', { tcc_id: tcc.id })

      setHasFavorited(!hasFavorited)
    } catch {
      Alert.alert(
        'Erro ao favoritar o tema',
        'Tente favoritar o tema novamente mais tarde'
      )
    }
  }, [tcc.id, hasFavorited])

  const handleEmail = useCallback(() => {
    const to = [tcc.creator.email]
    email(to, {
      subject: `Interesse de ${user.name} no tema sugerido ${tcc.suggestion}`,
      body: 'Digite aqui sua dúvida'
    }).catch(console.error)
  }, [tcc.creator, tcc.suggestion, user.name])

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#96CFF1" />
        </BackButton>

        <HeaderTitle>{tcc.suggestion}</HeaderTitle>
      </Header>
      <ScrollView style={{ paddingVertical: 20 }}>
        <Container>
          <IconsContainer>
            <IconButton onPress={handleEmail}>
              <MaterialIcon name="email" size={40} color="#fff" />
            </IconButton>
            <IconButton onPress={handleFavorite}>
              {hasFavorited ? (
                <MaterialIcon name="star" size={40} color="#fff" />
              ) : (
                <FeatherIcon name="star" size={40} color="#fff" />
              )}
            </IconButton>
          </IconsContainer>

          <ContainerText>
            <Title>Curso:</Title>
            <Info>{tcc.course}</Info>
          </ContainerText>
          <ContainerText>
            <Title>Sugestão:</Title>
            <Info>{tcc.suggestion}</Info>
          </ContainerText>
          <ContainerText>
            <Title>Descrição:</Title>
            <Info>{tcc.description}</Info>
          </ContainerText>
          <ContainerText>
            <Title>Area:</Title>
            <Info>{tcc.area}</Info>
          </ContainerText>
          <ContainerText>
            <Title>Links:</Title>
            <Info>{tcc.links}</Info>
          </ContainerText>
          <ContainerText>
            <Title>Tipo de usuário:</Title>
            <Info>{tcc && tcc.creator ? tcc.creator.type : ''}</Info>
          </ContainerText>
          {isCreator && (
            <>
              <ContainerButtons>
                <Button
                  style={{ backgroundColor: '#E5890B' }}
                  onPress={() =>
                    navigation.navigate('EditTcc', { tcc_id: tcc.id })
                  }
                >
                  <FeatherIcon name="edit" color="#032b44" size={25} />
                  <ButtonText>Editar</ButtonText>
                </Button>
                <Button onPress={handleDelete} style={{ marginLeft: 15 }}>
                  <FeatherIcon name="trash-2" color="#032b44" size={25} />
                  <ButtonText>Remover</ButtonText>
                </Button>
              </ContainerButtons>
            </>
          )}
        </Container>
      </ScrollView>
    </>
  )
}

export default DetailTcc
