import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
import EditProfile from '../pages/EditProfile'

const App = createStackNavigator()

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#33AAC2' }
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="EditProfile" component={EditProfile} />
  </App.Navigator>
)

export default AppRoutes
