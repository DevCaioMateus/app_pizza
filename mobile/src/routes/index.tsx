import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'

import { AuthContext } from '../contexts/AuthContext'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

export default function Routes(){
  const { isAuthenticated, loading } = useContext(AuthContext)

  if(loading){
    return(
      <View 
        style={{ 
          flex:1, 
          backgroundColor: '#1d1d2e', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size={60} color='#F5F7FB' />
      </View>
    )
  }

  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes />
  )
}