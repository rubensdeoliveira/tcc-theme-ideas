import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 100px;
`

export const ContainerText = styled.View`
  align-self: flex-start;
`

export const ContainerButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

export const Title = styled.Text`
  color: #032b44;
  font-size: 16px;
  font-family: 'Poppins-Bold';
`

export const Info = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Poppins-Medium';
  margin-bottom: 10px;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #032b44;
  flex-direction: row;
  align-items: center;
`

export const BackButton = styled.TouchableOpacity``

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`

export const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`

export const IconButton = styled.TouchableOpacity`
  margin-left: auto;
  margin-left: 10px;
`
