import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from '../../language/i18n';
import { ThemeContext } from '../../context/ThemeContext';


const LanguageSelect = ({ navigation }) => {
  const [currentLanguage, setcurrentLanguage] = useState('az');
  const { t } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      AsyncStorage.setItem('language', lang).then(() => {
        setcurrentLanguage(lang);
      });
    });
  };
  const { theme, toggleTheme } = useContext(ThemeContext);

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  };
  const titleStles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
    fontSize:24,
    marginBottom:10
  };

  useEffect(() => {
    AsyncStorage.getItem('language').then((lang) => {
      if (lang) {
        i18n.changeLanguage(lang).then(() => {
          setcurrentLanguage(lang);
        });
      }
    });
  }, [currentLanguage]);

  return (
    <View style={containerStyles}>
      <Text style={titleStles}>{t('selectlang')}</Text>

      <TouchableOpacity
        onPress={() => {
          changeLang('az');
          navigation.navigate('SettingsMain');
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Azərbaycanca</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          changeLang('en');
          navigation.navigate('SettingsMain');
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1c1c',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 20,
//   },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default LanguageSelect;
