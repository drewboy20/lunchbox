import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export default function ResturantItem() {
  return (
      <TouchableOpacity activeOpacity={1} style={{ marginBottom: 30 }}>
    <View style={{marginTop: 10, padding: 15, backgroundColor: 'white'}}>
      <ResturantImage/>
      <ResturantInfo/>
    </View>
    </TouchableOpacity>
  )
}
const ResturantImage = () => (
    <>
    <Image 
    source={{uri: "https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg"}}
    style={{ width: "100%", height: 180 }}
    />
    {/*
    <TouchableOpacity style={{position:'absolute', right: 20, top: 20}}>
        <MaterialCommunityIcons name='heart-outline' size={25} color='#fffff'/>
    </TouchableOpacity>
    */}
    </>
);
const ResturantInfo = () => (
    <View style={{
        flexDirection:"row", 
        justifyContent: 
        "space-between", 
        alignItems: "center"
        }}>
        <View>
    <Text style={{fontSize:15, fontWeight:"bold"}}>Farmhouse Kitchen Thai Cuisine</Text>
    <Text style={{fontSize:13, fontWeight:"gray"}}>30-45 ~ min</Text>
    </View>
    <View style={{
        backgroundColor: 'white', 
        height: 30, 
        width: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15}}>
    <Text >4.5</Text>
        </View>
    </View>
) 