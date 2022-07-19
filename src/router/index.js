import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Splash, ListHoodie, Profile, HoodieDetail} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="ListHoodie"
        component={ListHoodie}
        options={{headerShown: false, title: 'Hoodie'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HoodieDetail"
        component={HoodieDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
