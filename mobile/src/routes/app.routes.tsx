import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from '../pages/Dashboard'
import Order from '../pages/Order'
import FinshOrder from '../pages/FinishOrder'

export type StackParamsList = {
  Dashboard: undefined
  Order: {
    number: number | string
    orderId: string
  }
  FinishOrder: {
    number: number | string
    orderId: string
  }
}

const Stack = createNativeStackNavigator<StackParamsList>()

export default function AppRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='Dashboard' 
        component={Dashboard} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Order'
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='FinishOrder'
        component={FinshOrder}
        options={{
          title: 'Finalizar pedido',
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}