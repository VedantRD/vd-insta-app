import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { url } from '../../keys/URL'
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, ListItem, Left, Body, Right, Thumbnail, Text, H3 } from 'native-base';
import defaultDp from '../../assets/default.jpg'

const ShowFollowing = ({ route }) => {

    const userId = route.params.userId
    console.log('in following = ', userId)
    const [following, setFollowing] = useState(null)
    console.log('following = ', following)

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'get',
                    url: `${url}/getfollowing/${userId}`,
                    headers,
                })
                    .then(res => {
                        setFollowing(res.data.following)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            {following === null ?
                <Content contentContainerStyle={styles.loading}>
                    <ActivityIndicator color='blue' size='large'></ActivityIndicator>
                </Content>
                :
                following.length === 0 ?
                    <Content>
                        <H3 style={{ color: 'dimgray', textAlign: 'center', marginTop: '10%' }}>
                            You are not following anyone
                        </H3>
                    </Content>
                    :
                    <Content>
                        {following.map(user => {
                            return (
                                <TouchableOpacity key={user._id} onPress={() => navigateUser(user._id)}>
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={defaultDp} ></Thumbnail>
                                        </Left>
                                        <Body>
                                            <Text>{user.name}</Text>
                                            <Text note>{user.bio}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{user.followers.length} followers</Text>
                                        </Right>
                                    </ListItem>
                                </TouchableOpacity>
                            )
                        })}
                    </Content>
            }
        </Container>
    )
}

export default ShowFollowing

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
