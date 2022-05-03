import { View, Text, Image } from 'react-native'
import React from 'react'

const image = 
"https://images.unsplash.com/photo-1538333581680-29dd4752ddf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80"

const title = "American Eatery"

const description = "American ⋆ Comfort Food ⋆ $$ ⭐⭐ (2.5k)"


export default function About() {
  return (
    <View>
      <ResturantImage image={image}/>
      <ResturantTitle title={title}/>
      <ResturantDescription description={description}/>
    </View>
  )
}

const ResturantImage = (props) => (
    <Image source={{uri: props.image}}
            style={{width: "100%", height: 150}}
    ></Image>
)
const ResturantTitle = (props) => (
    <Text 
    style={{
        fontSize:29, 
        fontWeight: "600",
        marginTop: 10,
        marginHorizontal: 15}}>
    {props.title}</Text>
)

const ResturantDescription = (props) => (
        <Text style={{
            marginTop: 5,
            marginHorizontal: 15,
            fontSize: 15.5
        }}>{props.description}</Text>
)