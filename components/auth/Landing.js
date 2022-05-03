import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'


export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/LunchBox (2).png')} resizeMode="contain" style={styles.image} />
        <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginText}>Register</Text>

        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#113f58",
    alignItems: "center",
    justifyContent: "center",
  },
 
  //image: {
    //marginBottom: 40,
  //},
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#000000",
  },
  loginText: {
    color: 'white',
  },
});