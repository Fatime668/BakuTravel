import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SaveMain from '../../screens/saved/SaveMain';

const Saves = createNativeStackNavigator();


const SaveStack = () => {
  return (
    <Saves.Navigator>
      <Saves.Screen name="SavesMain" component={SaveMain} options={{headerShown:false}}/>
    </Saves.Navigator>
  )
}

export default SaveStack