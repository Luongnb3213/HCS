import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import HcsNavigator from './HcsNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HcsNavigator/>   
    </NavigationContainer>
  )
}

export default AppNavigator
