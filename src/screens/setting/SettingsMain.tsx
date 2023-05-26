import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgMoon from '../../assets/images/Moon';
import SvgSun from '../../assets/images/Sun';

const SettingsMain = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  
  const containerStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    flex: 1,
};


const buttonStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
};

const textStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
};
const titleStles = {
  color: theme === 'dark' ? '#1c1c1c' : '#fff',
  fontSize:24,
  marginBottom:10
};



  return (

    <SafeAreaView  style={containerStyles}>
    <View style={containerStyles}>
      <Text style={titleStles}>{t('settings')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LanguageSelect')} style={buttonStyles,styles.button}>
        <Text style={textStyles}>{t('change language')}</Text>
      </TouchableOpacity>

      <Text style={titleStles}>{t('change theme')}</Text>
      <TouchableOpacity onPress={toggleTheme} style={buttonStyles}>
      {theme === 'dark' ? <SvgMoon style={buttonStyles} /> : <SvgSun style={buttonStyles} /> }
   
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor:"#1c1c1c"
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   marginBottom: 20,
   
  // },
  button: {
    // marginTop: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom:10
  },
  // buttonText: {
  //   fontSize: 20,
  //   color: 'white',
  // },
});

export default SettingsMain;
