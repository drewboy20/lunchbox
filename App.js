//import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import {View , Text} from 'react-native'

import firebase from 'firebase/compat/app'

import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOE-ZkE0LDOkdHbqr-D7LbT6tJPsFbbBw",
  authDomain: "lunchbox-dev-5b4aa.firebaseapp.com",
  projectId: "lunchbox-dev-5b4aa",
  storageBucket: "lunchbox-dev-5b4aa.appspot.com",
  messagingSenderId: "274348022664",
  appId: "1:274348022664:web:b315e55feda5cecc37783d",
  measurementId: "G-F65SNYJQ9C"
};


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>

          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
       
      );

    }
    
    return(
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
            {/*<Stack.Screen name="Add" component={AddScreen}/> */}
          </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    )
  }
}

export default App