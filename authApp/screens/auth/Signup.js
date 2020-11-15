import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Left, Body, Right, Button, Title, Icon, Input, Item, Text, View, Form, Label } from 'native-base';
import axios from 'axios'
// "proxy": "http://10.0.2.2:5000",


const Signup = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = () => {
        axios({
            method: 'post',
            url: 'http://10.0.2.2:5000/signup',
            data: { name, email, password }
        })
            .then(res => {
                console.log(res.data)
                props.navigation.replace('signin')
            })
            .catch(err => console.log(err))
        // console.log(name, email, password)
    }

    return (
        <Container>
            <Content padder>
                <View style={{ marginLeft: '4%' }}>
                    <Text style={styles.registerHeader}>Register</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.loginText}>Already have Account ?</Text>
                        <TouchableOpacity onPress={() => props.navigation.replace('signin')}>
                            <Text style={{ color: '#0275d8', fontWeight: 'bold' }}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Form style={{ paddingRight: "5%", marginTop: '10%' }}>
                    <Item floatingLabel style={{ padding: 7, borderBottomWidth: 2 }}>
                        <Label>Name</Label>
                        <Input onChangeText={(text) => setName(text)} value={name} />
                    </Item>
                    <Item floatingLabel style={{ padding: 7, borderBottomWidth: 2 }}>
                        <Label>Email</Label>
                        <Input onChangeText={(text) => setEmail(text)} value={email} />
                    </Item>
                    <Item floatingLabel style={{ padding: 7, borderBottomWidth: 2 }}>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />
                    </Item>
                </Form>
                <View style={{ marginTop: '40%' }}>
                    <Button rounded iconLeft style={styles.registerButton} onPress={registerUser}>
                        <Icon name='person' />
                        <Text uppercase={false} style={styles.registerText}>Register</Text>
                    </Button>
                </View>
            </Content>
        </Container >
    )
}

export default Signup

const styles = StyleSheet.create({
    registerHeader: {
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: '25%',
    },
    loginText: {
        textAlign: 'center',
    },
    registerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: '10%',
        marginHorizontal: '20%',
        backgroundColor: '#0275d8',
    },
    registerText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 19,
    }
})
