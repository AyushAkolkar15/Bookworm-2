import * as React from 'react';
import HomeScreen from "./src/Home"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FictionScreen from "./src/Fiction";
import ComedyScreen from "./src/Comedy";
import UploadScreen from "./src/Upload";
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />  
        <Tab.Screen name="Fiction" component={FictionScreen} /> 
        <Tab.Screen name="Comedy" component={ComedyScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

