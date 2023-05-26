import { NavigationContainer } from '@react-navigation/native'
import React,{useState,useEffect} from 'react'
import { FirstLoginProvider } from './src/context/FirstLoginContext'
import SplashScreen from './src/screens/splash/SplashScreen'
import OpenScreen from './src/screens/splash/OpenScreen'
import { ThemeProvider } from './src/context/ThemeContext'
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);
  return (
    (
      showSplash ? <SplashScreen/> :
      
      <>
      <NavigationContainer>
        <FirstLoginProvider>
          <ThemeProvider>
          <OpenScreen />
          </ThemeProvider>
        </FirstLoginProvider> 
      </NavigationContainer>
    </>
  )
   
  )
}

export default App;

