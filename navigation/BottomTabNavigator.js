import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      >

        </Stack.Screen>
      </Stack.Navigator>
    // <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
    //   <BottomTab.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       title: 'Get Started',
    //       tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
    //     }}
    //   />
    //   <BottomTab.Screen
    //     name="Links"
    //     component={LinksScreen}
    //     options={{
    //       title: 'Resources',
    //       tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
    //     }}
    //   />
    // </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Главный экран';
    case 'Links':
      return 'Профиль';
  }
}
