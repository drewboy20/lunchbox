import React, {useState, useEffect, Component} from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import firebase from 'firebase/compat/app'
require('firebase/compat/firestore');
import { connect } from 'react-redux'
import Search from './Search';
import ResturantItem from './ResturantItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Feed(props) {
    const [posts, setPosts] = useState([]);


    useEffect(() =>{
      //let posts = [];
      //setPosts(posts);
      console.log('params', props.following)
      
        for(let i =0; i < props.following.length; i++){
          firebase.firestore()
            .collection("posts")
            .doc(props.following[i])
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data}
                })
                
                setPosts(posts.concat(posts))
                console.log('postz')
                
            })
          }
          /*.collection("posts").doc('TTSUxSBsn8PQ7LpxUpdHpW6AvzC2').collection('userPosts')
          .get()
          .then((snapshot) => {
              if(snapshot.exists){
                console.log('snap',snapshot.data())
                  setPosts(snapshot.data())
              }
              else{
                  console.log('does not exist')
                  console.log('cu', firebase.auth().currentUser.uid)
              }
          })
      */
      /*}
      if(props.usersLoaded == props.following.length){
          for(let i = 0; i < props.following.length; i++){
            console.log("i",i)
              const user = props.users.find(el => el.uid === props.following[i]);
              if(user != undefined){
                posts = [...posts, ...user.posts]
              }
          }
          posts.sort(function(x,y) {
            return x.creation - y.creation;
            
          })
          
          console.log("2nd posts ", posts)
      }

      }
    */
    }
      , [props.usersLoaded])


    return (
      <View style={styles.container}>
        <Search />
          <View style={styles.containerGallery}>
              <FlatList
                  numColumns={1}
                  horizontal={false}
                  data={posts}
                  renderItem={({item}) =>(
                      <View style={{borderRadius: 20}}>
                        
                    
                        <Image source={item.itemPhoto}
                              style={{ width: '100%', height: 180, paddingLeft: 10 }}></Image> 


                        <View style={{
                            flexDirection: 'row', 
                            justifyContent: 'space-around', 
                            alignItems: "center",
                            marginBottom: 10,
                            marginTop: 10}}>
                          <View style={{flexDirection: 'row'}}>
                          <Image
                            source={require('../assets/avatar.png')}
                            style={{ width: 20, height: 20, borderRadius:5}}>
                            </Image> 
                          <Text style={{paddingLeft: 5}}>{item.user}</Text>
                          </View>
                          <View style={{alignItems: 'center'}}>
                          <Text style={{flexWrap: 'wrap'}}>{item.caption}</Text>
                          <Text>{item.rating}</Text>
                          
                          </View>
                          

                        </View>
                        <View style={{backgroundColor: '#13114D', width: '100%', height: 10}}></View>
                        
                    
                    </View>
                  )}
              />
              
          </View>
        </View>
    )
  }
  

  const ResturantInfo = (posts) => (
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
    <Text >1</Text>
        </View>
    </View>
) 

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#13114D',
        paddingTop: 10
      },
      containerInfo: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 20,
        marginBottom: 20
      },
      containerGallery: {
        flex: 1,
        margin: 10,
        paddingTop: 10,
        backgroundColor: 'white'
      }
  })

  const mapStateToProps = (store) => ({
      currentUser: store.userState.currentUser,
      following: store.userState.following,
      users: store.usersState.users,
      usersLoaded: store.usersState.users

  })

export default connect(mapStateToProps, null)(Feed);