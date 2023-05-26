import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Paginate from '../Paginate'
import OnBoardingData from '../../../data/OnBoardingData'
import OnBoardScreen from './OnBoardScreen'

const OnBoard = ({ navigation }:any) => {
  const nextHandler = () => {
    if (OnBoardingData.length - 1 !== currentIndex) {
      slidersRef.current.scrollToIndex({ index: currentIndex + 1 })
      setCurrentIndex(currentIndex + 1)
    }
    else {
      navigation.navigate("CategoryList")
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const slidersRef = useRef<any>(null)
  
  return (
    <View style={styles.container}>
      <FlatList
        data={OnBoardingData}
        ref={slidersRef}
        renderItem={OnBoardScreen}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled

      />
    {
      currentIndex <= 2 ?(
        <View style={{flexDirection:"row", justifyContent:"space-between",margin:24,alignItems:"center"}}>
        <Paginate datas={OnBoardingData} currentIndex={currentIndex} />
        <TouchableOpacity style={styles.btn} onPress={nextHandler}><Text style={styles.next}>Next</Text></TouchableOpacity>
      </View>
      ) : (
        <View style={{marginBottom:30,marginHorizontal:24}}>
        
        <TouchableOpacity style={styles.start} onPress={nextHandler}>
        <Text style={{textAlign:'center',color:"#fff",fontSize:16,fontWeight:"600"}}>Get Started</Text>
        </TouchableOpacity>
        </View>
      )
    }
      
    </View>
  )
}

export default OnBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c"
  },
  btn:{
    backgroundColor:"#018CF1",
    paddingHorizontal:55,
    paddingVertical:15,
    borderRadius:10
  },
  next:{
    color:"#F6F6F6",
    fontSize:16,
    fontWeight:"500"
  },
  start:{
    backgroundColor:"#018CF1",
    paddingHorizontal:55,
    paddingVertical:15,
    borderRadius:10
  },
  started:{
    color:"#F6F6F6",
    fontSize:16,
    position:"relative",
    zIndex:3,
    textAlign:"center",
    fontWeight:"500"
  }
})