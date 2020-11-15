import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Container, Content, Thumbnail, Text, Button, View, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import defaultDp from '../../assets/default.jpg'
import pokeball from '../../assets/pokeball.jpg'
import { UserContext } from '../../App'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { url } from '../../keys/URL'

const UserProfile = (props) => {

    console.log('props in userprofile', props)
    // console.log('route in userprofile', route)
    const userId = props.route.params.userId
    const navigation = props.route.params.navigation
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const { state, dispatch } = useContext(UserContext)

    // Follow the User
    const followUser = () => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'patch',
                    url: `${url}/follow`,
                    headers,
                    data: {
                        followId: userId
                    }
                })
                    .then(async (res) => {
                        console.log(res.data)
                        dispatch({ type: 'UPDATE', payload: { following: res.data.result.following, followers: res.data.result.followers } })
                        await AsyncStorage.setItem('user', JSON.stringify(res.data.result))
                        setUser((prev) => {
                            return {
                                ...prev,
                                followers: [...prev.followers, res.data.result._id]
                            }
                        })
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.log(err))
    }

    // Unfollow the User
    const unfollowUser = () => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'patch',
                    url: `${url}/unfollow`,
                    headers,
                    data: {
                        unfollowId: userId
                    }
                })
                    .then(async (res) => {
                        console.log(res.data)
                        dispatch({ type: 'UPDATE', payload: { following: res.data.result.following, followers: res.data.result.followers } })
                        await AsyncStorage.setItem('user', JSON.stringify(res.data.result))
                        let filtered = user.followers.filter(item => item !== res.data.result._id)
                        setUser({
                            ...user,
                            followers: filtered
                        })
                        // console.log(user)
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    // fetch profile data
    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'get',
                    url: `${url}/profile/${userId}`,
                    headers,
                })
                    .then(res => {
                        setUser(res.data.user)
                        axios({
                            method: 'get',
                            url: `${url}/getuserposts/${userId}`,
                            headers,
                        })
                            .then(postres => {
                                setUserPosts(postres.data.posts)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        user && userPosts ?

            // --------- user profile data -------- //
            <Container>
                <Content style={{ padding: 25 }}>

                    {/* ---------- Dp row ----------- */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Thumbnail source={defaultDp} style={{ height: 100, width: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ textAlign: 'center' }}>{userPosts.length}</Text>
                                <Text style={{ textAlign: 'center' }}>Posts</Text>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ textAlign: 'center' }}>
                                    {user.following.length}
                                </Text>
                                <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('following', { userId })}>Following</Text>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ textAlign: 'center' }}>
                                    {user.followers.length}
                                </Text>
                                <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('followers', { userId })}>Followers</Text>
                            </View>
                        </View>
                    </View>

                    {/* ---------- Name, Bio and Follow ----------- */}
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '65%' }}>
                            <Title style={{ color: 'black', marginLeft: 0 }}>{user.name}</Title>
                            {/* <View style={{ marginTop: '3%' }}> */}
                            <Text>{user.bio}</Text>
                            {/* </View> */}
                        </View>
                        <View style={{ alignSelf: 'center' }}>

                            {state.following.includes(userId) ?
                                <Button bordered danger style={{ borderRadius: 7 }} onPress={unfollowUser}>
                                    <Text uppercase={false} style={{ fontSize: 17 }}>Unfollow</Text>
                                </Button>
                                :
                                <Button style={{ backgroundColor: '#0275d8', borderRadius: 7 }} onPress={followUser}>
                                    <Text uppercase={false} style={{ fontSize: 17 }}>Follow</Text>
                                </Button>
                            }

                        </View>
                    </View>

                    {/* ---------- Button Row ----------- */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                        <Button bordered style={{ paddingHorizontal: 20, borderRadius: 5 }}>
                            <Icon name='edit' size={20}></Icon>
                            <Text style={{ color: 'black' }} uppercase={false}>Edit Profile</Text>
                        </Button>
                        <Button bordered style={{ paddingHorizontal: 20, borderRadius: 5 }}>
                            <Icon name='cog' size={20}></Icon>
                            <Text style={{ color: 'black' }} uppercase={false}>My Settings</Text>
                        </Button>
                    </View>

                    {/* ---------- Horizontal Ruler ----------- */}
                    <View style={{ borderBottomColor: 'darkgray', borderBottomWidth: 1, marginTop: '8%' }} />

                    {/* ---------- Gallery ----------- */}
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Image source={pokeball} style={{ width: '32.1%', height: 100, margin: 2 }} />
                        <Image source={pokeball} style={{ width: '32.1%', height: 100, margin: 2 }} />
                        <Image source={pokeball} style={{ width: '32.1%', height: 100, margin: 2 }} />
                        <Image source={pokeball} style={{ width: '32.1%', height: 100, margin: 2 }} />
                    </View>

                </Content>
            </Container>

            :

            // --------- Loading container -------- //
            <Container>
                <Content contentContainerStyle={styles.loading}>
                    <ActivityIndicator color='blue' size='large'></ActivityIndicator>
                </Content>
            </Container>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
