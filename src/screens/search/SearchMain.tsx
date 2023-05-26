import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import Places from '../../data/Places';
import ExploreCard from '../../components/tabComponents/ExploreCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Categories from '../../data/Catagories';
import {useFocusEffect} from '@react-navigation/native';
import '../../language/i18n'
import { useTranslation } from "react-i18next";
import { ThemeContext } from '../../context/ThemeContext';

const SearchMain = ({navigation}:any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentLanguage, setcurrentLanguage] = useState('az')
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  

  useFocusEffect(
    useCallback(() => {
      console.log('salam');
    }, []),
  );

  const filteredPlaces = Places.filter(place => {
    if (selectedCategory && place.categoryid != selectedCategory) {
      return false;
    }
    return place.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleCategoryPress = (categoryId: any) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
   
  };
  const titleStles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
    fontSize:24,
   
  };
  const textStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
};
const searchStyles = {
 backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
};


  return (
    <GestureHandlerRootView style={containerStyles}>
      <View>
        <View style={{marginHorizontal: 8, marginTop: 10, marginBottom: 5}}>
          <TextInput
            style={containerStyles,styles.searchInput}
            placeholder={t("search").toString()}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={'gray'}
            value={searchText}
          />
        </View>
        <FlatList
          horizontal
          data={Categories}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.sectionList,
                selectedCategory === item.id && {backgroundColor: 'red'},
              ]}
              onPress={() => handleCategoryPress(item.id)}>
              <Text style={textStyles}>
                {item.img} {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <FlatList
        data={filteredPlaces}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailScreen', {id: item.id})
                }>
                <ExploreCard item={item} />
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </GestureHandlerRootView>
  );
};

export default SearchMain;

const styles = StyleSheet.create({
  sectionList: {
    marginHorizontal: 8,
    marginVertical: 5,
    borderWidth: 2,
    width: 125,
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
  searchInput: {
    borderRadius: 20,
    borderWidth:1,
  borderColor:'gray',
    paddingVertical: 15,
    paddingLeft: 15,
    color: 'white',
    fontSize: 16,
  },
});
