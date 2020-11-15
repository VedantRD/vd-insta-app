import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Button, Icon, Input, Item, Text, View, Form, Label } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../App'
import { url } from '../../keys/URL'

const Signin = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { state, dispatch } = useContext(UserContext)

    const loginUser = () => {
        axios({
            method: 'post',
            url: `${url}/signin`,
            data: { email, password }
        })
            .then(async res => {
                console.log(res.data.user)
                if (res.data.status === 'success') {
                    dispatch({ type: 'USER', payload: res.data.user })
                    try {
                        await AsyncStorage.setItem('token', res.data.token)
                        await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                        await AsyncStorage.setItem('isLoggedIn', 'true')
                        console.log('login successful')
                    } catch (e) {
                        console.log('signin nantr storage set kartana error', e)
                    }
                    props.navigation.replace('TabNav')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Content padder>
                <View style={{ marginLeft: '4%' }}>
                    <Text style={styles.loginHeader}>Login</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.registerText}>Dont have Account ?</Text>
                        <TouchableOpacity onPress={() => props.navigation.replace('signup')}>
                            <Text style={{ color: '#0275d8', fontWeight: 'bold' }}> Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Form style={{ paddingRight: "5%", marginTop: '15%' }}>
                    <Item floatingLabel style={{ padding: 7, borderBottomWidth: 2 }}>
                        <Label>Email</Label>
                        <Input onChangeText={(text) => setEmail(text)} value={email} />
                    </Item>
                    <Item floatingLabel style={{ padding: 7, borderBottomWidth: 2 }}>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />
                    </Item>
                </Form>
                <View style={{ marginTop: '45%' }}>
                    <Button rounded iconLeft style={styles.loginButton} onPress={loginUser}>
                        <Icon name='person' />
                        <Text uppercase={false} style={styles.loginText}>Login</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}
export default Signin

const styles = StyleSheet.create({
    loginHeader: {
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: '40%',
    },
    registerText: {
        textAlign: 'center',
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: '10%',
        marginHorizontal: '20%',
        backgroundColor: '#0275d8',
    },
    loginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 19
    }
})
