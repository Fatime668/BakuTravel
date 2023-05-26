import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SvgSaveIcon from '../../assets/images/SaveIcon';
import Places from '../../data/Places';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context/ThemeContext';
import Geolocation from '@react-native-community/geolocation';

const ExploreCard = ({ item }: any) => {
  const [allData, setAllData] = useState<any>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [deviceLatitude, setDeviceLatitude] = useState(0);
  const [deviceLongitude, setDeviceLongitude] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const containerStyles:any = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    flex: 1,
    justifyContent: 'center',
    width: 300,
  };
 AsyncStorage.clear()
  const titleStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
    fontSize: 20,
    marginLeft: 10,
  };

  const textStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
  };

  useEffect(() => {
    loadSavedPlaces();
    getCurrentLocation();
  }, []);

  const loadSavedPlaces = async () => {
    try {
      const savedPlaces = await AsyncStorage.getItem('SavedPlaces');
      if (savedPlaces !== null) {
        setAllData(JSON.parse(savedPlaces));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setDeviceLatitude(position.coords.latitude);
        setDeviceLongitude(position.coords.longitude);
      },
      error => {
        console.log(error);
      }
    );
  };

  const savePlace = async (id: any) => {
    try {
      const getPlace = Places.find(place => place.id === id);
      if (getPlace) {
        const updatedData = [...allData, getPlace];
        setAllData(updatedData);
        await AsyncStorage.setItem('SavedPlaces', JSON.stringify(updatedData));
        setIsSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePlace = async (id: any) => {
    try {
      const updatedData = allData.filter((place: any) => place.id !== id);
      setAllData(updatedData);
      await AsyncStorage.setItem('SavedPlaces', JSON.stringify(updatedData));
      setIsSaved(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (id: any) => {
    if (isSaved) {
      removePlace(id);
    } else {
      savePlace(id);
    }
  };

  useEffect(() => {
    const isPlaceSaved = allData.find((place: any) => place.id === item.id);
    setIsSaved(!!isPlaceSaved);
  }, [allData, item.id]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  const distance = calculateDistance(
    deviceLatitude,
    deviceLongitude,
    item.lat,
    item.long
  );

  return (
    <View key={item.id} style={styles.placeContainer}>
      <View style={styles.main}>
        <View>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.placeImage}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.saveIcon} onPress={() => handleSave(item.id)}>
          <SvgSaveIcon fill={isSaved ? 'white' : 'none'} stroke={'white'} />
        </TouchableOpacity>
        <View style={[containerStyles, { marginLeft: 5, marginTop: 5 }]}>
          <Text style={titleStyles}>{item.name}</Text>
          <View style={{ flexDirection: 'row', gap: 18.5, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text>📍</Text>
              <Text style={textStyles}>{distance.toFixed(2)} km</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text>🕘</Text>
              <Text style={textStyles}>
                {item.open} - {item.close}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text>⭐️</Text>
              <Text style={textStyles}>{item.rate}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExploreCard;

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
    backgroundColor: '#1c1c1c',
    position: 'absolute',
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
