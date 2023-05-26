import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Place} from '../../models/Place';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import '../../language/i18n'
import { useTranslation } from "react-i18next";
import { ThemeContext } from '../../context/ThemeContext';
const PlaceDetails = ({route}: any) => {
  const {id} = route.params;

  const [place, setPlace] = useState<Place | null>(null);
  const mapRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [currentLanguage, setcurrentLanguage] = useState('az')

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get<Place>(
          `https://644fe705ba9f39c6ab6f6bc2.mockapi.io/products/${id}`,
        );
        setPlace(response.data);
      } catch (error) {
        console.error('Error fetching place:', error);
      }
    };

    fetchPlace();
  }, []);

  const handleGoToMap = () => {
    if (place) {
      const url = `https://maps.google.com/maps?q=${place.lat},${place.long}`;
      Linking.openURL(url);
    }
  };
  const mainStyle = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    flex:1
  };
  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
    alignSelf: 'center',
 
  };
  const titleStles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
    fontSize:24,
   
  };

const textstyles = {
color: theme === 'dark' ? '#1c1c1c' : '#fff',
 fontSize: 20,
 fontWeight: '600',
 marginBottom: 5,
 lineHeight: 28,
};
const NameStyles = {
  // backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
  flexDirection: 'row',
  //   justifyContent: 'space-between',
    // marginRight: 16,
};
const imageStyles = {
  width: 350,
    height: 225,
    marginBottom: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
}

  return (
    <View style={mainStyle}>
      <View style={containerStyles}>
        {place ? (
          <>
            <Image source={{uri: place.imageUrl}} style={imageStyles} />
            <View style={NameStyles}>
              <Text style={textstyles}>{place.name} </Text>
              <Text style={textstyles}>⭐ {place.rate}</Text>
            </View>
            <View style={styles.information}>
              <Text style={textstyles}>{t("information")}</Text>
              <Text style={textstyles}>🕘 {place.opentime}</Text>
              <Text style={textstyles}>📞 {place.contact}</Text>
              <Text style={textstyles}>📍 {place.location}</Text>
              <Text style={textstyles}>{t("Map")}</Text>
            </View>

            <View style={styles.MapMain}>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: place.lat,
                    longitude: place.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  scrollEnabled={true}
                  ref={mapRef}>
                  <Marker
                    coordinate={{
                      latitude: place.lat,
                      longitude: place.long,
                    }}
                  />
                </MapView>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleGoToMap}>
              <Text style={styles.buttonText}>{t("Go To Map")}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: '#1c1c1c',
  },
  container: {
    alignSelf: 'center',
    backgroundColor: '#1c1c1c',
  },
  image: {
    width: 350,
    height: 225,
    marginBottom: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  NameRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    lineHeight: 28,
  },
  rate: {
    alignSelf: 'flex-end',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
  },
  information: {
    marginTop: 15,
    rowGap: 8,
  },
  infotext: {
    color: '#E8E8E8',
    fontSize: 16,
    fontWeight: '500',
  },
  time: {
    color: '#B9B9B9',
    marginBottom: 5,
  },
  contact: {
    marginBottom: 10,
    color: '#B9B9B9',
  },
  MapHeader: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  MapMain: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.9,
    marginTop: 3,
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#018CF1',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default PlaceDetails;
