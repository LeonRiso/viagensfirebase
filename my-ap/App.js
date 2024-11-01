// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/login';
import MainScreen from './screens/main';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="main" 
          component={MainScreen} 
          options={{ title: 'Tela Principal' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
