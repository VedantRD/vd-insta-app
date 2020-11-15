import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import defaultDp from '../../assets/default.jpg'


const RenderNotifications = () => {
    return (
        <ListItem avatar>
            <Left>
                <Thumbnail source={defaultDp} />
            </Left>
            <Body>
                <Text>Bill Gates</Text>
                <Text note>has started following you</Text>
            </Body>
            <Right>
                <Text note>21 min ago</Text>
            </Right>
        </ListItem>
    )
}

export default RenderNotifications

const styles = StyleSheet.create({})
