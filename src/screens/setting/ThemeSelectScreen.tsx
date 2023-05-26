import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeSelectScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const containerStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
    flex: 1,
  };

  const buttonStyles = {
    backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
  };

  const textStyles = {
    color: theme === 'dark' ? '#fff' : '#1c1c1c',
  };

  const setTheme = (selectedTheme: 'dark' | 'light') => {
    toggleTheme(selectedTheme);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Theme</Text>
      <TouchableOpacity onPress={() => setTheme('dark')} style={[styles.button, styles.darkButton]}>
        <Text style={styles.buttonText}>Dark Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme('light')} style={[styles.button, styles.lightButton]}>
        <Text style={styles.buttonText}>Light Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  darkButton: {
    backgroundColor: '#1c1c1c',
  },
  lightButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default ThemeSelectScreen;
