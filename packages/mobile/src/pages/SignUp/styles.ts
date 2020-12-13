import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'

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
  margin: 10px 0 24px;
`

export const BackToSign = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #032b44;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackToSignText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
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
  font-family: 'Poppins-Regular';
`
