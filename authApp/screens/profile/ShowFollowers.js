import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { url } from '../../keys/URL'
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, ListItem, Left, Body, Right, Thumbnail, Text, H3 } from 'native-base';
import defaultDp from '../../assets/default.jpg'

const ShowFollowers = ({ route }) => {

    const userId = route.params.userId
    const [followers, setFollowers] = useState(null)
    // console.log('followers = ', followers)
    const dp = 'https://res.cloudinary.com/vdcloud/image/upload/v1589045456/default_lkduqa.jpg'

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'get',
                    url: `${url}/getfollowers/${userId}`,
                    headers,
                })
                    .then(res => {
                        setFollowers(res.data.followers)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            {followers === null ?
                <Content contentContainerStyle={styles.loading}>
                    <ActivityIndicator color='blue' size='large'></ActivityIndicator>
                </Content>
                :
                followers.length === 0 ?
                    <Content>
                        <H3 style={{ color: 'dimgray', textAlign: 'center', marginTop: '10%' }}>
                            You have no followers
                        </H3>
                    </Content>
                    :
                    <Content>
                        {followers.map(user => {
                            return (
                                <TouchableOpacity key={user._id} onPress={() => navigateUser(user._id)}>
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={defaultDp} ></Thumbnail>
                                        </Left>
                                        <Body>
                                            <Text>{user.name}</Text>
                                            <Text note style={{}}>{user.bio}</Text>
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

export default ShowFollowers

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
