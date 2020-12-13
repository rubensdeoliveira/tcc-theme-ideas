import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
import MyTccs from '../pages/MyTccs'
import MyFavoriteTccs from '../pages/MyFavoriteTccs'
import ListTccs from '../pages/ListTccs'
import CreateTcc from '../pages/CreateTcc'
import EditTcc from '../pages/EditTcc'
import DetailTcc from '../pages/DetailTcc'
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
    <App.Screen name="MyTccs" component={MyTccs} />
    <App.Screen name="MyFavoriteTccs" component={MyFavoriteTccs} />
    <App.Screen name="ListTccs" component={ListTccs} />
    <App.Screen name="CreateTcc" component={CreateTcc} />
    <App.Screen name="EditTcc" component={EditTcc} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="DetailTcc" component={DetailTcc} />
    <App.Screen name="EditProfile" component={EditProfile} />
  </App.Navigator>
)

export default AppRoutes
