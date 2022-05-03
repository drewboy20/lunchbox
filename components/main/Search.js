import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase/compat/app'
require('firebase/compat/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([])
    
    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            });
            setUsers(users);
        })
    }


  return ( 
    <View>
        <TextInput 
        placeholder = "Search" 
        onChangeText={(search)=> fetchUsers(search)}
        style={{height: 40, paddingLeft: 10, selectionColor: "#428AF8", underlineColorAndroid: "#428AF8", borderRadius: 20, backgroundColor: 'white' }}
        />
        <FlatList
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({item}) => (
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                <Text style={{color: 'white'}}>{item.name}</Text>
                </TouchableOpacity>
            )}
        
        />
        </View>
  )
}