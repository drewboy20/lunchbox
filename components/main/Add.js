import { View, TextInput, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/firestore"
import ResturantItem from './ResturantItem'
import About from './About'
import MenuItem from './MenuItem'



export default function Add() {
    
    const [caption, setCaption] = useState("")


    const saveReview = () => {

        firebase.firestore().collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        })

    }

  return (
    <View>
      <ScrollView>
      <About/>
      <MenuItem/>
      <TextInput
        placeholder='Write a review'
          onChangeText={(caption) => setCaption(caption)} 
          />

      <Button title="Save" onPress={() => saveReview()}/>
      </ScrollView>
    </View>
  )
}