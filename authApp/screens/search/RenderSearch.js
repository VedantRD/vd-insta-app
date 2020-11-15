import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';
import defaultDp from '../../assets/default.jpg'
import { TouchableOpacity } from 'react-native-gesture-handler';

const RenderSearch = ({ user }) => {

    const dp = 'https://res.cloudinary.com/vdcloud/image/upload/v1589045456/default_lkduqa.jpg'
    // const user = props.user

    return (
        <ListItem avatar>
            <Left>
                <Thumbnail source={defaultDp} ></Thumbnail>
            </Left>
            <Body>
                <Text>{user.name}</Text>
                {/* <Text note style={{}}>Doing what you like will always keep you happy . .</Text> */}
                <Text note style={{}}>{user.bio}</Text>
            </Body>
            <Right>
                <Text note>{user.followers.length} followers</Text>
            </Right>
        </ListItem>
    )
}

export default RenderSearch

const styles = StyleSheet.create({})
