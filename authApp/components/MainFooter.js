import React from 'react'
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native'

const MainFooter = (props) => {
    return (
        <Footer>
            <FooterTab>
                <Button active={props.navigation.state.index === 0}>
                    <Icon name="home" />
                </Button>
                <Button active={props.navigation.state.index === 1}>
                    <Icon name="search" />
                </Button>
                <Button active={props.navigation.state.index === 2}>
                    <Icon active name="heart" />
                </Button>
                <Button active={props.navigation.state.index === 3}>
                    <Icon name="person" />
                </Button>
            </FooterTab>
        </Footer>
    )
}

export default MainFooter

const styles = StyleSheet.create({})
