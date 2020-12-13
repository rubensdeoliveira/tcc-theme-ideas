import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Tcc } from './index'

export const Container = styled.View`
  flex: 1;
  padding: 15px;
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

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 5px;
  border-radius: 5px;
  background: #ed6907;
  height: 50px;
`

export const ButtonText = styled.Text`
  font-family: 'Poppins-Medium';
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
`

export const TccsList = styled(FlatList as new () => FlatList<Tcc>)`
  padding: 32px 24px 16px;
`

export const TccContainer = styled(RectButton)`
  background: #032b44;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`

export const TccAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`

export const TccInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`

export const TccName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`

export const TccMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const TccMetaText = styled.Text`
  margin-left: 8px;
  color: #f8f8fc;
  font-family: 'RobotoSlab-Regular';
`

export const PageIndicatorContainer = styled.View`
  padding: 0px 30px;
  padding-top: 10px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
