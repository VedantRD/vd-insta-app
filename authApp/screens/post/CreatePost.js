import React, { useState, useContext } from 'react'
import { StyleSheet, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'
// import { Picker } from '@react-native-community/picker'
import { Button, Container, Content, Toast, Root } from 'native-base'
import axios from 'axios'
import { Text, View, Form, Item, Input, Label } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';
import { url } from '../../keys/URL'
import { UserContext } from '../../App'

const CreatePost = (props) => {

    const [photo, setPhoto] = useState(null)
    const [photoUrl, setPhotoUrl] = useState(null)
    const [caption, setCaption] = useState('')
    const { state, dispatch } = useContext(UserContext)

    console.log('photoUrl = ', photoUrl)

    const uploadPost = () => {
        AsyncStorage.getItem('token')
            .then(token => {
                const headers = { 'Authorization': `Bearer ${token}` }
                axios({
                    method: 'post',
                    headers,
                    url: `${url}/createpost`,
                    data: { photo: photoUrl, body: caption }
                })
                    .then(res => {
                        console.log(res)
                        props.navigation.navigate('profile')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const uploadImage = () => {

        if (!caption) {
            return alert('please add caption')
        }

        let data = new FormData()
        data.append("file", photo)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "vdcloud")
        fetch('https://api.cloudinary.com/v1_1/vdcloud/image/upload/', {
            method: 'post', body: data
        })
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    return alert('failed to upload image')
                }
                setPhotoUrl(data.url)
                uploadPost()

            })
            .catch(err => console.log(err))
    }

    const choosePhoto = () => {
        const options = {
            title: 'Select Photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                const source = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                }
                console.log('img = ', source)
                setPhoto(source)
            }
        })


    }

    return (
        <Container>
            <Content>

                {/* ------------ Select Image Area -------------- */}
                <TouchableOpacity onPress={choosePhoto}>
                    {photo ?
                        <Image style={{ height: 400, width: '100%' }} source={{ uri: photo.uri }} />
                        :
                        <View style={styles.selectImage}>
                            <Text style={{ color: 'dimgray', fontSize: 25 }}>
                                Choose Photo
                    </Text>
                        </View>
                    }
                </TouchableOpacity>

                {/* ------------ Caption form -------------- */}
                <Form style={{ padding: 5 }}>
                    <Item floatingLabel style={{ padding: 7, borderBottomWidth: 2 }}>
                        <Label>Add Caption</Label>
                        <Input onChangeText={(text) => setCaption(text)} value={caption} />
                    </Item>
                </Form>

                {/* ------------ Submit Post Button -------------- */}
                <Button transparent style={{ justifyContent: 'center', marginTop: '20%', marginHorizontal: '25%' }} onPress={uploadImage}>
                    <TouchableOpacity>
                        <Text style={{ color: '#0275d8', fontSize: 19, fontWeight: 'bold' }}>Upload Post</Text>
                    </TouchableOpacity>
                </Button>

            </Content>
        </Container>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    selectImage: {
        height: 400,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#edf0f2',
        backgroundColor: '#edf0f2',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
