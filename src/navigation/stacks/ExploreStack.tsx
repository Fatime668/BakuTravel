import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreMain from '../../screens/home/ExploreMain';
import PlaceDetail from '../../screens/home/PlaceDetail';

const Explore = createNativeStackNavigator();

const ExploreStack = () => {
  return (
    <Explore.Navigator>
      <Explore.Screen name="ExploreMain" component={ExploreMain} options={{headerShown:false}} />
      <Explore.Screen name="DetailScreen" component={PlaceDetail} options={{headerShown:false}}/>
    </Explore.Navigator>
  )
}

export default ExploreStack