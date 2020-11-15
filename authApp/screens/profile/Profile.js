import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { Container, Content, Thumbnail, Text, Button, View, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import defaultDp from '../../assets/default.jpg'
import pokeball from '../../assets/pokeball.jpg'
import { UserContext } from '../../App'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { url } from '../../keys/URL'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const Profile = (props) => {

    const { state } = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    // console.log('userPosts = ', userPosts)
    console.log('profile props', props)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);


    // fetch profile data
    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'get',
                    url: `${url}/profile/${state._id}`,
                    headers,
                })
                    .then(res => {
                        setUser(res.data.user)
                        axios({
                            method: 'get',
                            url: `${url}/getuserposts/${state._id}`,
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

            // --------- Profile Contaier --------- //
            <ScrollView contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

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
                                    <Text style={{ textAlign: 'center' }} onPress={() => props.navigation.navigate('following', { userId: user._id })}>Following</Text>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {user.followers.length}
                                    </Text>
                                    <Text style={{ textAlign: 'center' }} onPress={() => props.navigation.navigate('followers', { userId: user._id })}>Followers</Text>
                                </View>
                            </View>
                        </View>

                        {/* ---------- Name and Bio ----------- */}
                        <Title style={{ color: 'black', marginLeft: 0, marginTop: 10 }}>
                            {user.name}
                        </Title>
                        <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                            {/* <Text style={{ fontWeight: 'bold' }}>Bio : </Text> */}
                            <Text>{user.bio}</Text>
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
                        <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, flexWrap: 'wrap' }}>
                            {userPosts.length > 0 && userPosts.map(post => {
                                return (
                                    <Image source={{ uri: post.photo }} style={{ width: '32.1%', height: 100, margin: 2 }} key={post._id} />
                                )
                            })}
                        </View>

                    </Content>
                </Container>
            </ScrollView>

            :

            // --------- Loading container -------- //
            <Container>
                <Content contentContainerStyle={styles.loading}>
                    <ActivityIndicator color='blue' size='large'></ActivityIndicator>
                </Content>
            </Container>
    )
}

export default Profile

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
