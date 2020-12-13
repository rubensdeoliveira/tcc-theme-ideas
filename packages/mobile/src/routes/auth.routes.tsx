import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Recover from '../pages/Recover'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#33AAC2' }
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Recover" component={Recover} />
  </Auth.Navigator>
)

export default AuthRoutes
