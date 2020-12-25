import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigation, createStackNavigator } from 'react-navigation-stack';

import App from './App';
import Details from './Details';

const AppNavigator = createStackNavigator(
    {
        Home: App,
        Details: Details,
    },
    {
        initialRouteName: 'Home'
    }
);
export default createAppContainer(AppNavigator);