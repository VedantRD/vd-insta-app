import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Signin from '../../screens/auth/Signin';
import Signup from '../../screens/auth/Signup';
import Loading from '../../screens/Loading';
import TabNav from '../tab/TabNavigator';
import UserProfile from '../../screens/profile/UserProfile';
import CreatePost from '../../screens/post/CreatePost';
import ShowFollowers from '../../screens/profile/ShowFollowers';
import ShowFollowing from '../../screens/profile/ShowFollowing';

const Stack = createStackNavigator();

const StackNav = () => {

    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="loading" component={Loading} />
            <Stack.Screen name="TabNav" component={TabNav} />
            <Stack.Screen name="userProfile" component={UserProfile} />
            <Stack.Screen name="signin" component={Signin} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="createpost" component={CreatePost} />
            <Stack.Screen name="followers" component={ShowFollowers} />
            <Stack.Screen name="following" component={ShowFollowing} />
        </Stack.Navigator>

    )
}

export default StackNav