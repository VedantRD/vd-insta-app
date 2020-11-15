import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../App'

const Loading = (props) => {

    const { state, dispatch } = useContext(UserContext)
    const [user, setUser] = useState(null)

    // console.log('in the loading component')

    const getUser = () => {
        AsyncStorage.getItem('user')
            .then(user => {
                if (user) {
                    dispatch({ type: 'USER', payload: JSON.parse(user) })
                    setUser(user)
                }
            })
            .catch(err => console.log(err))
    }

    const checkToken = () => {
        AsyncStorage.getItem('token')
            .then(token => {
                // console.log('token = ', token)
                if (token) {
                    getUser()
                    props.navigation.replace('TabNav')
                }
                else {
                    props.navigation.replace('signin')
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator style={styles.loading} color='blue' size='large'></ActivityIndicator>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
