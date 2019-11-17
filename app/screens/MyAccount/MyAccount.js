import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import * as firebase from 'firebase'

export default class MyAccount extends Component {

    constructor() {
        super();
        this.state = {
            login: false
        }
    }

    // Funcion que se ejecuta luego del constructor y luego del render
    async componentDidMount() {
        this.setState({ login: false });
        await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ login: true });
            }
        });
    }

    logout = () => {
        firebase.auth().signOut().then(res => {
            this.setState({ login: false });
        });
    }

    goToScreen = nameScreen => {
        this.props.navigation.navigate(nameScreen);
    }

    render() {
        const { login } = this.state;
        if (login) {
            return (
                <View style={styles.viewBody}>
                    <Text>Estas logueado</Text>
                    <Button title='Cerrar sesión' onPress={() => this.logout()}></Button>
                </View>
            );
        }
        return (
            <View style={styles.viewBody}>
                <Text>My Account Screen</Text>
                <Button title="Registro" onPress={() => this.goToScreen('Register')}></Button>
                <Button title="Login" onPress={() => this.goToScreen('Login')}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});