import React, {useState,useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgSaveIcon from '../../assets/images/SaveIcon';
import ExploreCard from '../../components/tabComponents/ExploreCard';
import '../../language/i18n'
import { useTranslation } from "react-i18next";
import { ThemeContext } from '../../context/ThemeContext';
const SaveMain = ({navigation}: any) => {
  const [savedPlaces, setSavedPlaces] = useState<any>([]);
  const [currentLanguage, setcurrentLanguage] = useState('az')
  const { t, i18n } = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await loadSavedPlaces();
        } catch (error) {
          console.log('Error while fetching saved places:', error);
        }
      };

      fetchData();
    }, []),
  );
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
   
  };
  const textStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
};

  const loadSavedPlaces = async () => {
    try {
      const savedPlacesJson = await AsyncStorage.getItem('SavedPlaces');
      if (savedPlacesJson) {
        const places = JSON.parse(savedPlacesJson);
        setSavedPlaces(places);
      }
    } catch (error) {
      console.log('Error loading saved places:', error);
    }
  };

  return (
    <View style={containerStyles}>
      {savedPlaces.length > 0 ? (
        <View style={{marginVertical:25,marginHorizontal:15}}>
          <Text style={titleStles}>{t("Saved")}</Text>
        </View>
      ) : (
        <View
          style={{flex: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={textStyles}>{t("No Saved Items Yet")}</Text>
        </View>
      )}
      <View style={containerStyles}>
        <FlatList
          data={savedPlaces}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ExploreCard item={item} />}
        />
      </View>
    </View>
  );
};

export default SaveMain;

const styles = StyleSheet.create({
  placeInfoContainer: {
    backgroundColor: '#1C1C1C',
    padding: 5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 16,
    width: 300,
  },
  saveIcon: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    padding: 8,
    right: 15,
    top: 15,
    borderRadius: 20,
  },
  placeContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  main: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#262626',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  placeImage: {
    width: '100%',
    height: 220,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  placeRating: {
    fontSize: 13,
    color: 'white',
    alignSelf: 'center',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  PlaceTime: {
    color: 'white',
    fontSize: 13,
    alignSelf: 'center',
  },
});
