import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsMain from '../../screens/setting/SettingsMain';
import LanguageSelect from '../../screens/setting/LanguageSelect'
import ThemeSelectScreen from '../../screens/setting/ThemeSelectScreen';

const Settings = createNativeStackNavigator();


const SettingsStack = () => {
  return (
    <Settings.Navigator initialRouteName='SettingMain'>
  
      <Settings.Screen
       name="SettingsMain" 
       component={SettingsMain} 
       options={{headerShown:false}}
       />
      <Settings.Screen
        name="LanguageSelect"
        component={LanguageSelect}
        options={{headerShown: false}}
      />
     

    </Settings.Navigator>
  )
}

export default SettingsStack