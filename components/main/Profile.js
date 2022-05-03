import React, {useState, useEffect} from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import firebase from 'firebase/compat/app'
require('firebase/compat/firestore');
import { connect } from 'react-redux'

function Profile(props) {
    const [userPost, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState(false)

    useEffect(() =>{
        const { currentUser, posts } = props;
        console.log({ currentUser, posts })

        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }
        else{
          firebase.firestore()
          .collection("users")
          .doc(props.route.params.uid)
          .get()
          .then((snapshot) => {
              if(snapshot.exists){
                  setUser(snapshot.data())
              }
              else{
                  console.log('does not exist')
              }
          })
          firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data}
                })
                setUserPosts(posts)
                
            })
        }
        
        if(props.following.indexOf(props.route.params.uid) > -1){
            setFollowing(true);
        }else{
          setFollowing(false)
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
          firebase.firestore()
          .collection("following")
          .doc(firebase.auth().currentUser.uid)
          .collection("userFollowing")
          .doc(props.route.params.uid)
          .set({})
    }
      const onUnfollow = () => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
  }

    if(user === null){
      return <View/>
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Image 
            style={{width: 50, height: 50, borderRadius: 25, margin: 10}}
            source={require('../assets/avatar.png')}
            resizeMode={'cover'}
            />
            <Text>{user.name}</Text>

            {props.route.params.uid !== firebase.auth().currentUser.uid ?(
                <View>
                    {following ? (
                      <Button
                          title='Following'
                          onPress={() => onUnfollow()}
                      />
                    ) : 
                    (
                      <Button
                      title='Follow'
                      onPress={() => onFollow()}
                  />
                    )}
                </View>
            ) : null}
        </View>
        <View style={styles2.container}>
          <View style={styles2.containerGallery}>
              <FlatList
                  numColumns={1}
                  horizontal={false}
                  data={userPost}
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
                      <View style={{alignItems: 'center'}}>
                      <Text>{item.caption}</Text>
                      <Text>{item.rating}</Text>
                      
                      </View>
                      

                    </View>
                    <View style={{backgroundColor: '#13114D', width: '100%', height: 10}}></View>
                    
                
                </View>

                  )}
              />
              
            </View>
          </View>
          
        </View>
    )
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      containerInfo: {
        alignItems: 'center',
        backgroundColor: '#bb99ff',
        paddingBottom: 10
      },
      containerGallery: {
        flex: 1,
        alignItems: 'center',
        margin: 20
      }
  })
  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#13114D',
      paddingTop: 10
    },
    containerInfo: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
      posts: store.userState.posts,
      following: store.userState.following
  })

export default connect(mapStateToProps, null)(Profile);