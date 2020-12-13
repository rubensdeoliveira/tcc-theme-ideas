import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`

export const BackButton = styled.TouchableOpacity``

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`

export const UserName = styled.Text`
  font-size: 24px;
  color: #032b44;
  text-align: center;
  font-family: 'Poppins-Bold';
  margin-top: 20px;
  margin-bottom: 50px;
`

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 5px;
  border-radius: 5px;
  background: #ed6907;
  height: 56px;
  margin-bottom: 5px;
`

export const ButtonText = styled.Text`
  font-family: 'Poppins-Medium';
  color: #fff;
  font-size: 16.5px;
  margin-left: 10px;
`

export const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`

export const LogoutButton = styled.TouchableHighlight`
  background: #ed6907;
  padding: 10px;
  border-radius: 13px;
  opacity: 0.8;
`
