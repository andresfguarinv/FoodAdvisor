import React from 'react';
import { Icon } from 'react-native-elements'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Screens
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import TopFiveScreen from '../screens/TopFive';
import MyAccountScreen from '../screens/MyAccount';

// Stacks: Son las subpantallas que estaran dentro de la principal y permitiran adelantar/retroceder
// Se debe tener en cuenta el orden en que se asigenn porque asi mismo se visualizaran
const homeScreenStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Home' // Header
        })
    }
});
const topFiveScreenStack = createStackNavigator({
    TopFive: {
        screen: TopFiveScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Top 5 Restaurantes'
        })
    }
});
const searchScreenStack = createStackNavigator({
    Search: {
        screen: SearchScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Buscar'
        })
    }
});
const myAccountScreenStack = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Mi cuenta'
        })
    }
});

// RouteStack: Es donde se definen los stacks que se visualizaran en el menu
const RootStack = createBottomTabNavigator({
    Home: {
        screen: homeScreenStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (<Icon name='compass-outline' type='material-community' size={22} color={tintColor} />)
        })
    },
    TopFive: {
        screen: topFiveScreenStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Top 5',
            tabBarIcon: ({ tintColor }) => (<Icon name='star-outline' type='material-community' size={22} color={tintColor} />)
        })
    },
    Search: {
        screen: searchScreenStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ tintColor }) => (<Icon name='magnify' type='material-community' size={22} color={tintColor} />)
        })
    },
    MyAccount: {
        screen: myAccountScreenStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Mi cuenta',
            tabBarIcon: ({ tintColor }) => (<Icon name='home-outline' type='material-community' size={22} color={tintColor} />)
        })
    }
},
    {
        initialRouteName: 'Home',
        order: ['Home', 'TopFive', 'Search', 'MyAccount'],
        tabBarOptions: {
            inactiveTintColor: '#646464',
            activeTintColor: '#00a680'
        }
    }
);

// AppContainer: Contenedor de la navegación
export default createAppContainer(RootStack);