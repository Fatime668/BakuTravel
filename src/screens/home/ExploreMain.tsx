import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import Places from '../../data/Places';
import {getUserCategories} from '../../utils/UserSavedCategories';
import {Category} from '../../models/Category';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import ExploreCard from '../../components/tabComponents/ExploreCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import '../../language/i18n';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';

const API_KEY = '';
const GOOGLE_API_KEY = '';

const ExpolreMain = ({navigation}: any) => {
  const [existCategories, setExistCategories] = useState<Category[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentLanguage, setcurrentLanguage] = useState('az');
  const {t, i18n} = useTranslation();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      i18n.options.lng = lang;
      AsyncStorage.setItem('language', lang);
      setcurrentLanguage(lang);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getLocation();
      getUserCategories().then(res => {
        setExistCategories(res);
        console.log('salam');
      });
    }, []),
  );

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        if (Platform.OS === 'ios') {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position);
              getWeatherData(position);
            },
            error => {
              console.log(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else if (Platform.OS === 'android') {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position);
              getWeatherData(position);
            },
            error => {
              console.log(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      } else {
        setLocation(null);
      }
    });
  };

  const getWeatherData = async (position: any) => {
    const {latitude, longitude} = position.coords;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      );

      const addressComponents = response.data.results[0].address_components;
      let city = null;
      let country = null;
      for (const component of addressComponents) {
        for (const type of component.types) {
          if (type === 'administrative_area_level_2') {
            city = component.long_name;
          } else if (type === 'country') {
            country = component.long_name;
          }
        }
      }
      setCityName(city);
      setCountryName(country);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openLocationSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return granted === 'granted';
    } else if (Platform.OS === 'ios') {
      const granted = await Geolocation.requestAuthorization('always');
      return granted;
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View>
        <ListItem item={item} />
      </View>
    );
  };

  const renderMyItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailScreen', {id: item.id})}>
        <ExploreCard item={item} />
      </TouchableOpacity>
    );
  };

  const ListAnother = ({item}: any) => {
    let id = item.id;
    let filteredPlaces = Places.filter(place => {
      return place.categoryid.toString() == id;
    });

    return (
      <View>
        <FlatList horizontal data={filteredPlaces} renderItem={renderMyItem} />
      </View>
    );
  };
  const categoryItemContainerStles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    marginBottom: 10,
    // flex:1
  };
  const titleStles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
    fontSize: 16,
  };
  const ListItem = ({item}: any) => {
    return (
      <View style={[categoryItemContainerStles]}>
        <Text style={[titleStles, {marginLeft: 15, fontSize: 20}]}>
          {item.name}s nearby
        </Text>
        <View>
          <ListAnother item={item} />
        </View>
      </View>
    );
  };

  const convertKelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
  };

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    flex: 1,
  };
  const locationContainertextcontainerStyles:any = {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'center',
    paddingRight: 70,

    color: theme === 'dark' ? '#1c1c1c' : '#fff',
  };

  const locationBackground:any = {
    flexDirection: 'row',
    backgroundColor: theme === 'dark' ? 'gray' : '#262626',
    height: 36,
    borderRadius: 12,
  };

  const weathertextStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',

    // flexDirection: 'row',
    // alignItems: 'center',
  };
  return (
    <GestureHandlerRootView style={[containerStyles]}>
      {location ? (
        <View>
          {countryName ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-around',
                  marginHorizontal: 10,
                }}>
                <View style={[locationBackground]}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 8,
                      marginLeft: 4,
                    }}>
                    <Text>📍</Text>
                  </View>
                  {cityName && countryName && (
                    <Text style={[locationContainertextcontainerStyles]}>
                      {cityName.substring(0, 7)}, {countryName.substring(0, 10)}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: theme === 'dark' ? 'gray' : '#262626',
                    height: 36,
                    borderRadius: 12,
                    paddingHorizontal: 5,
                  }}>
                  {weatherData && weatherData.main && (
                    <View style={styles.weatherContainer}>
                      {weatherData.weather[0].icon && (
                        <Image
                          style={styles.weatherIcon}
                          source={{
                            uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                          }}
                        />
                      )}
                      <Text style={weathertextStyles}>
                        {convertKelvinToCelsius(
                          weatherData.main.temp,
                        ).toFixed()}
                        °C
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <FlatList
                data={existCategories}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator animating={true} color={MD2Colors.red800} />
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1c1c1c',
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 16,
              fontSize: 24,
              fontWeight: '500',
            }}>
            {t('Geolocation is disabled')}
          </Text>
          <Text style={{textAlign: 'center', width: 275, fontSize: 16}}>
            {t(
              ' To improve the application, enable geolocation in the settings.',
            )}
          </Text>
          <TouchableOpacity
            onPress={openLocationSettings}
            style={{
              backgroundColor: '#018CF1',
              width: 300,
              marginTop: 36,
              paddingVertical: 12,
              borderRadius: 8,
            }}>
            <Text style={{alignSelf: 'center', fontSize: 16, color: '#fff'}}>
              {t('Open Settings')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
};
export default ExpolreMain;

const styles = StyleSheet.create({
  categoryItemContainer: {
    marginBottom: 10,
  },
  categoryItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 15,
  },
  placeItemContainer: {
    marginRight: 10,
  },
  placeItemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  placeItemText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  PlaceTime: {
    color: 'white',
    fontSize: 13,
    alignSelf: 'center',
  },
  locationText: {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'center',
    paddingRight: 70,
    color: '#fff',
  },
  pinIcon: {
    width: 20,
    height: 20,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  temperatureText: {
    fontSize: 16,
    marginRight: 5,
    color: 'white',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
  headerText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
    marginBottom: 15,
    marginTop: 30,
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
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
});
