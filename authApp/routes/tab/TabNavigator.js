import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home'
import Profile from '../../screens/profile/Profile';
import Icon from 'react-native-vector-icons/FontAwesome'
import Search from '../../screens/search/Search';
import Notifications from '../../screens/activity/Notifications';
import CreatePost from '../../screens/post/CreatePost';
import UserProfile from '../../screens/profile/UserProfile';


const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            initialRouteName='home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'profile') {
                        iconName = focused ? 'user' : 'user';
                    } else if (route.name === 'notifications') {
                        iconName = focused ? 'heart' : 'heart';
                    } else if (route.name === 'search') {
                        iconName = focused ? 'search' : 'search';
                    } else if (route.name === 'createpost') {
                        iconName = focused ? 'plus-square-o' : 'plus-square-o';
                    }

                    return <Icon name={iconName} size={iconName === 'plus' || iconName === 'home' || iconName === 'plus-square-o' ? 28 : size
                    } color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#d4cfcf',
                showLabel: false,
                style: {
                    backgroundColor: '#0275d8'
                },
            }}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="search" component={Search} />
            <Tab.Screen name="createpost" component={CreatePost} />
            <Tab.Screen name="notifications" component={Notifications} />
            <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator >
    )
}

export default TabNav