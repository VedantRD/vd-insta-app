import React, { useState, useContext } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Container, Header, Item, Input, Icon, Content, H3, List } from 'native-base';
import RenderSearch from './RenderSearch';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { url } from '../../keys/URL'
import { UserContext } from '../../App'

const Search = (props) => {

    const [query, setQuery] = useState('')
    const [users, setUsers] = useState(null)
    const { state } = useContext(UserContext)

    const search = (text) => {
        setQuery(text)
        if (text === '') {
            return
        }
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'post',
                    url: `${url}/search`,
                    headers,
                    data: { query: text }
                })
                    .then(res => {
                        console.log(res.data)
                        setUsers(res.data.users)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const navigateUser = (userId) => {
        if (state._id === userId)
            props.navigation.navigate('profile')
        else {
            // console.log('props in search = ', props.navigation)
            props.navigation.navigate('userProfile', { userId })
        }
    }

    return (
        <Container style={{ flex: 1 }}>

            {/* ----------- Search Bar ------------- */}
            <Header searchBar rounded style={{ backgroundColor: '#0275d8' }}>
                <StatusBar backgroundColor='#0275d8' barStyle='light-content' />
                <Item style={{ paddingLeft: 15 }}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search People Here" onChangeText={text => search(text)} value={query} />
                </Item>
            </Header>

            <Content>

                {users === null ?

                    <H3 style={{ color: 'dimgray', textAlign: 'center', marginTop: '5%' }}>
                        Search Results Will Show Up Here
                    </H3>
                    :

                    users.length === 0 ?

                        <H3 style={{ color: 'dimgray', textAlign: 'center', marginTop: '5%' }}>
                            No matching results found
                        </H3>

                        :

                        <List style={{ flex: 1 }}>

                            {users.map(user => {
                                return (
                                    <TouchableOpacity key={user._id} onPress={() => navigateUser(user._id)}>
                                        <RenderSearch user={user}></RenderSearch>
                                    </TouchableOpacity>
                                )
                            })}


                        </List>

                }

            </Content>

        </Container>
    )
}

export default Search

const styles = StyleSheet.create({})
