import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #032b44;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`

export const Username = styled.Text`
  color: #96cff1;
  font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 42px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 30px;
`

export const Slogan = styled.Text`
  color: #addcf0;
  font-size: 21px;
  font-family: 'Poppins-Regular';
  text-align: center;
  margin-bottom: 30px;
`

export const ContainerButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
  border-radius: 5px;
  background: #ed6907;
  height: 50px;
  flex: 1;
`

export const ButtonText = styled.Text`
  font-family: 'Poppins-Medium';
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
`
