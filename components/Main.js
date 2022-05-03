import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { Component } from 'react'
import { View , Text, SafeAreaView, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase/compat/app'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/actions/index'
import Searchbar from './main/Searchbar'
import TabNav from './main/TabNav'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import AddScreen from './main/Add'
import SearchScreen from './main/Search'


function ActionBarIcon() {
    return (
      <Image
      source={{uri : 'https://document-export.canva.com/gpyEo/DAEtMbgpyEo/15/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20220502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220502T132742Z&X-Amz-Expires=34875&X-Amz-Signature=44f399d6aa0b105b5c0c25a085896c6378899843c42fa87b893302aee2e1cd10&X-Amz-SignedHeaders=host&response-expires=Mon%2C%2002%20May%202022%2023%3A08%3A57%20GMT'}}
      style={{ width: 50, height: 50, borderRadius: 40/2, marginLeft : 25 }} />
    );
  }

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    render() {

        return (
            <Tab.Navigator initialRouteName="Feed" 
            //header={false} 
            navigationOptions={{

            }}
            screenOptions={{ headerTintColor:"white", 
                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: '#13114D'},
                headerTitleStyle:{textAlign: 'center' },
                headerTitle: (
                    <Image style={{height: 10, width: 20}} source={require('./assets/avatar.png')}/>
                    ),
                     
            }}
            >
            <Tab.Screen name="Feed" component={FeedScreen} navigation={this.props.navigation}
            options={{
                headerTitle: 'Feed', 
                headerLeft : props => <ActionBarIcon {...props} />,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),
            }}
            />
            <Tab.Screen name="Add" component={AddScreen}
            options={{
                headerTitle: 'Leave a Review', 
                headerLeft : props => <ActionBarIcon {...props} />,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                ),
            }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
            listeners={({ navigation }) => ({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})

                }})}
            options={{
                headerTitle: 'Profile', 
                headerLeft : props => <ActionBarIcon {...props} />,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                ),
            }}
            />
        </Tab.Navigator>
        
        )
        
    }
    }

const mapStateToProps = (store)=> ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);