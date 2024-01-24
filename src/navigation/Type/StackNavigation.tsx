import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />
      <Stack.Screen
        name={StackNav.AuthStack}
        component={StackRoute.AuthStack}
      />
      <Stack.Screen
        name={StackNav.RecordPages}
        component={StackRoute.RecordPages}
      />
      <Stack.Screen name={StackNav.SetupDoc} component={StackRoute.SetupDoc} />
      <Stack.Screen
        name={StackNav.AddSignature}
        component={StackRoute.AddSignature}
      />
      <Stack.Screen name={StackNav.AddName} component={StackRoute.AddName} />
      <Stack.Screen name={StackNav.AddDate} component={StackRoute.AddDate} />
    </Stack.Navigator>
  );
}
