import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: RobotoSlab-Medium;
  margin: 24px 0 24px;
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
