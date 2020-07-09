import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text, Image, TextInput, Alert } from 'react-native';
import { RootToaster, Toast } from 'react-native-root-toaster';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { Audio } from 'expo-av';

import Constants from 'expo-constants';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return (<Text></Text>);
  } else {
    return (
      <View style={styles.container}>
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Вход" component={HomeScreen} options={{
              title: '',
              headerStyle: {
                height: 0
              },
            }} />
          </Stack.Navigator>
        </NavigationContainer>
        <RootToaster defaultMessage={'Default message'} defaultColor='gray' />
        <StatusBar style="auto" />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
