import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { Button, Container, Title, Content, Text } from 'native-base'
// import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../App'
import axios from 'axios'
import { url } from '../keys/URL'
import RenderPost from './post/RenderPost';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Home = (props) => {

    const { state, dispatch } = useContext(UserContext)
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState(null)
    // console.log('posts = ', posts)

    // Refresh Code
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        dispatch(type = 'USER', { payload: { user: null, isLoggedIn: false } })
        console.log('logout success')
        props.navigation.replace('signin')
    }

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'get',
                    url: `${url}/allposts`,
                    headers,
                })
                    .then(res => {
                        setPosts(res.data.posts)
                        // console.log(res)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        // <ScrollView contentContainerStyle={{
        //     flex: 1,
        // }} refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

        // {
        posts ?

            <Container>
                <Content>
                    {posts.map(post => {
                        return (
                            <RenderPost post={post} key={post._id}></RenderPost>
                        )
                    })}

                    <Button onPress={logout} style={{ justifyContent: 'center' }}>
                        <Title>Logout</Title>
                    </Button>
                </Content>

            </Container>
            :
            // --------- Loading container -------- //
            <Container>
                <Content contentContainerStyle={styles.loading}>
                    <ActivityIndicator color='blue' size='large'></ActivityIndicator>
                </Content>
            </Container>
        // }
        // </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
