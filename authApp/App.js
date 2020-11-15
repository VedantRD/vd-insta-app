import React, { createContext, useReducer, useState, useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { initialState, reducer } from './reducers/userReducer'
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './routes/stack/stackNavigator'

export const UserContext = createContext()

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <StatusBar backgroundColor='#0275d8' barStyle='light-content' />
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </UserContext.Provider>
  )
}
export default App

