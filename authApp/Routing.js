import React, { useState, useContext, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './routes/stack/stackNavigator'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from './App'

const Routing = () => {

    // const { state, dispatch } = useContext(UserContext)
    // const [user, setUser] = useState(null)

    // console.log('in the routing component')

    // const getUser = () => {
    //     AsyncStorage.getItem('user')
    //         .then(user => {
    //             if (user) {
    //                 dispatch({ type: 'USER', payload: JSON.parse(user) })
    //                 setUser(user)
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }

    // const checkToken = () => {
    //     AsyncStorage.getItem('token')
    //         .then(token => {
    //             if (token) {
    //                 getUser()
    //                 navigation.replace('TabNav')
    //             }
    //             else {
    //                 navigation.replace('signin')
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     getUser()
    // }, [])

    return (
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
    )

}
export default Routing