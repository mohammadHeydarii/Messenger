import React from 'react';
import { Home, Login } from 'components/src';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routesName } from 'core/src';

const Stack = createNativeStackNavigator();
const Routes = ({ token }: { token: string }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Boolean(token) ? (
          <Stack.Screen
            name={routesName.HOME}
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name={routesName.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
