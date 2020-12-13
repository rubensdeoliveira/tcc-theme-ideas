import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
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
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}/* ${props =>
    props.isFocused &&
    css`
      border-color: #ed6907;
    `} */
`

export const TextInput = styled.TextInput`
  flex: 1;
  padding-top: 16px;
  color: #333333;
  font-size: 18px;
  font-family: 'Poppins-Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
