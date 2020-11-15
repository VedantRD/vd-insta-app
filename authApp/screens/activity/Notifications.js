import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Text, Content, H3, View, List } from 'native-base';
import RenderNotifications from './RenderNotifications';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Notifications = () => {
    return (
        <Container>
            <Content>

                {/* <H3 style={{ color: 'dimgray', textAlign: 'center', marginTop: '5%' }}>No Recent Activity</H3> */}

                <List>
                    <TouchableOpacity>
                        <RenderNotifications></RenderNotifications>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <RenderNotifications></RenderNotifications>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <RenderNotifications></RenderNotifications>
                    </TouchableOpacity>
                </List>

            </Content>
        </Container>
    )
}

export default Notifications

const styles = StyleSheet.create({})
