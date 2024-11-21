import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddMenu from './screens/AddMenu';
import Filter from './screens/Filter';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Restaurant Home' }} />
        <Stack.Screen name="AddMenu" component={AddMenu} options={{ title: 'Add Menu Item' }} />
        <Stack.Screen name="Filter" component={Filter} options={{ title: 'Filter Dishes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}