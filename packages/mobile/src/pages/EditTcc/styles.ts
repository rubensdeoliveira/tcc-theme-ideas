import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 50px 0 24px;
`

export const StyledPicker = styled(Picker)`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f8f8fc;
  border-color: #f8f8fc;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  flex-direction: row;
  align-items: center;
  color: #333333;
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
