import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'


const SCREEN_WIDTH = Dimensions.get('window').width

const RenderOnboard = ({item}:any) => {
  return (
    <View style={styles.item}>
            <Image source={item.image} style={{ width: SCREEN_WIDTH - 32, alignSelf: "center", height: 343 }} />
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 32 }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "500", textAlign: "center", }}>{item.title}</Text>
                <Text style={{ color: "white",fontSize:14,lineHeight:22,width:324, textAlign: "center",marginTop:15 }}> {item.description}</Text>
            </View>
        </View >
  )
}

export default RenderOnboard

const styles = StyleSheet.create({
   
        item: {
            width: SCREEN_WIDTH,
            paddingHorizontal: 16,
            marginTop: 41
        }
})