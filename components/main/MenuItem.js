import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'

const foods = [
    {
        title:"Charred Sandwich",
        description: "Toasted to perfection",
        price: "$12.50",
        image: "https://static.toiimg.com/thumb/83740315.cms?width=1200&height=900"

    },
    {
        title:"Chicken Noodle Soup",
        description: "Ultra-satisfying",
        price: "$8.00",
        image: "https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Chicken-Noodle-Soup-Recipe-1200.jpg"
    },
    {
        title:"Italian Olive Pizza",
        description: "Handmade and cooked in a stove oven",
        price: "$15.00",
        image: "https://m.media-amazon.com/images/I/61o9VDuQTgL._AC_SX679_.jpg"
    },
    {
        title:"Italian Olive Pizza",
        description: "Handmade and cooked in a stove oven",
        price: "$15.00",
        image: "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18745-italian-chicken-wraps-760x580.jpg?ext=.jpg"
    },
    ]

    const styles = StyleSheet.create({
        menuItemStyle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20
        },
        titleStyle: {
            fonstSize: 19,
            fontWeight: '600'
        }
    })


export default function MenuItem() {
  return (
      
      <>

      {foods.map((food, index) => ( 
      <View key={index}>
    <View style={styles.menuItemStyle}>
      <FoodInfo food={food}/>
      <FoodImage food={food}/>
    </View>
    </View>
    ))}
    </>
    
  )
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly"}}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>

    </View>
)

const FoodImage = (props) =>(
    <View>
        <Image source={{uri: props.food.image}} style={{width: 100, height: 100, borderRadius: 8}}/>
    </View>

    )