import React from 'react';
import {
  Chat,
  // ChatScreen,
  Contact,
  Conversations,
  Login,
  Profile,
  ProfileContact,
} from 'components/src';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routesName } from 'core/src';

// import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Routes = ({ token }: { token: string }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Boolean(token) ? (
          <>
            <Stack.Screen
              name={routesName.CONVERSATIONS}
              component={Conversations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routesName.CHAT}
              component={Chat}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={routesName.CONTACT}
              component={Contact}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={routesName.PROFILE}
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routesName.PROFILECONTACT}
              component={ProfileContact}
              options={{ headerShown: false }}
            />
          </>
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
