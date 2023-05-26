import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardScreen from '../../screens/splash/onBoard/OnBoardScreen';
import CategoryList from '../../screens/category/CategoryList';

const Start = createNativeStackNavigator();

const StartStack = () => {
  return (
    <Start.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Start.Screen name="Onboard" component={OnBoardScreen} />
      <Start.Screen
        name="CategoryList"
        options={{gestureEnabled: false}}
        component={CategoryList}
      />
    </Start.Navigator>
  );
};

export default StartStack;
