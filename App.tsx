
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import SwitchNavigator from './navigation/LoginNavigator'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/index'
import {Provider}  from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)


export default function App() {
  return (
    <Provider store={store}>
        <SwitchNavigator />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
