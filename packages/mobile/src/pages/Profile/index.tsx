import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { useNavigation } from '@react-navigation/native'

import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  UserName,
  Button,
  ButtonText,
  TopContainer,
  LogoutButton
} from './styles'

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth()

  const navigation = useNavigation()

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria'
      },
      responseImage => {
        if (responseImage.didCancel) {
          return
        }

        if (responseImage.error) {
          Alert.alert('Erro ao atualizar seu avatar.')
          return
        }

        const data = new FormData()

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: responseImage.uri
        })

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data)
        })
      }
    )
  }, [updateUser, user.id])

  return (
    <Container>
      <TopContainer>
        <BackButton onPress={handleGoBack}>
          <FeatherIcon name="chevron-left" size={24} color="#fff" />
        </BackButton>
        <LogoutButton onPress={signOut}>
          <FeatherIcon name="power" size={22} color="#fff" />
        </LogoutButton>
      </TopContainer>

      <UserAvatarButton onPress={handleUpdateAvatar}>
        <UserAvatar
          source={{
            uri:
              (user && user.avatar_url) ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }}
        />
      </UserAvatarButton>

      <UserName>
        {user.name} {user.surname}
      </UserName>

      <Button
        onPress={() => navigation.navigate('EditProfile')}
        style={{ backgroundColor: '#E5890B', marginBottom: 20 }}
      >
        <FeatherIcon name="edit" color="#032b44" size={25} />
        <ButtonText>Editar perfil</ButtonText>
      </Button>

      <Button onPress={() => navigation.navigate('MyTccs')}>
        <MaterialIcon name="school" color="#032b44" size={30} />
        <ButtonText>Meus temas</ButtonText>
      </Button>

      <Button onPress={() => navigation.navigate('MyFavoriteTccs')}>
        <MaterialIcon name="star" color="#032b44" size={30} />
        <ButtonText>Meus favoritos</ButtonText>
      </Button>
    </Container>
  )
}

export default Profile
