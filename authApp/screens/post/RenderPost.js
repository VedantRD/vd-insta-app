import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, View } from 'native-base';
import defaultDp from '../../assets/default.jpg'
import pokeball from '../../assets/pokeball.jpg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import Moment from 'react-moment';

const RenderPost = ({ post }) => {
    return (
        <Card style={{ marginTop: 0, marginBottom: 0, borderBottomWidth: 0, borderTopWidth: 0, paddingBottom: 10 }}>

            {/* ------------- DP Row --------------- */}
            <CardItem style={{ paddingTop: 7, paddingBottom: 7 }}>
                <Left>
                    <Thumbnail source={defaultDp} style={{ height: 45, width: 45 }} />
                    <Body style={{ marginLeft: 15 }}>
                        <Text>{post.postedBy.name}</Text>
                    </Body>
                </Left>
            </CardItem>

            {/* -------------- Image --------------- */}
            <CardItem cardBody>
                <Image source={{ uri: post.photo }} style={{ height: 350, width: null, flex: 1 }} />
            </CardItem>

            {/* ------------- Like Comment Row --------------- */}
            <CardItem style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, paddingTop: 6 }}>
                <View style={{ flexDirection: 'row', marginRight: 0 }}>
                    <Button transparent style={{ marginRight: 20 }}>
                        <View style={{ marginRight: 5 }}>
                            <Icon name="heart" size={25} color='red' />
                        </View>
                        <View>
                            <Text style={{ fontSize: 18 }}>{post.likes.length}</Text>
                        </View>
                    </Button>
                    <Button transparent>
                        <View style={{ marginRight: 5 }}>
                            <Icon name="comment-o" size={26} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 18 }}>{post.comments.length}</Text>
                        </View>
                    </Button>
                </View>
                <Text style={styles.timePosted}>{post.createdAt}</Text>
            </CardItem>

            {/* ------------- Caption --------------- */}
            <CardItem style={{ paddingTop: 0 }}>
                <Body>
                    <Text style={{ color: 'dimgray' }}>
                        {post.body}
                    </Text>
                </Body>
            </CardItem>

        </Card>
    )
}

export default RenderPost

const styles = StyleSheet.create({
    timePosted: {
        color: 'dimgray',
    }
})
