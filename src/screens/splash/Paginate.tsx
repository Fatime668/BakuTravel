import { StyleSheet, Text, View ,Animated} from 'react-native'
import React from 'react'

const Paginate = ({ datas, currentIndex }: any) => {
  return (
    <View style={{ flexDirection: "row", gap: 4,marginHorizontal:24 }}>
    {
        datas.map((e: any, i: any) => (
            <Animated.View key={e.id} style={[styles.dot, currentIndex + 1 <= i ? { opacity: 0.5, } : { opacity: 1, width: 8 }]}>
            </Animated.View>
        ))
    }
</View>
  )
}

export default Paginate

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: "white"
    }
})