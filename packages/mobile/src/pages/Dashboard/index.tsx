import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image } from 'react-native'
import logo from '../../assets/logo.png'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { useAuth } from '../../hooks/auth'
import {
  Container,
  Header,
  HeaderTitle,
  UserAvatar,
  Username,
  ProfileButton,
  Title,
  Slogan,
  ContainerButtons,
  Button,
  ButtonText
} from './styles'

export interface User {
  id: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  console.log(user.avatar_url)

  const navigation = useNavigation()

  return (
    <>
      <Header>
        <HeaderTitle>
          Bem vindo(a), {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={() => navigation.navigate('Profile')}>
          <UserAvatar
            source={{
              uri:
                (user && user.avatar_url) ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }}
          />
        </ProfileButton>
      </Header>
      <Container>
        <Title>TCC Theme Ideas</Title>
        <Slogan>Sua plataforma de idéias para temas de TCC</Slogan>
        <Image source={logo} style={{ width: 180, height: 180 }} />

        <ContainerButtons>
          <Button style={{ backgroundColor: '#E5890B' }} onPress={() => {}}>
            <Icon name="edit" color="#032b44" size={25} />
            <ButtonText>Buscar Temas</ButtonText>
          </Button>
          <Button onPress={() => {}} style={{ marginLeft: 15 }}>
            <MaterialIcon name="emoji-objects" color="#032b44" size={25} />
            <ButtonText>Sugerir Tema</ButtonText>
          </Button>
        </ContainerButtons>
      </Container>
    </>
  )
}

export default Dashboard
