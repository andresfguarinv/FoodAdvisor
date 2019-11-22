import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Button, SocialIcon, Divider } from 'react-native-elements'
import { LoginStruct, LoginOptions } from '../../forms/Login'
import t from 'tcomb-form-native'
const Form = t.form.Form;
import * as firebase from 'firebase'
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Facebook from 'expo-facebook';
import { FacebookApi } from '../../utils/Social'

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            loginStruct: LoginStruct,
            loginOptions: LoginOptions,
            loginData: {},
            loginErrorMessage: ''
        }
    }

    onChangeFormLogin = (formValue) => {
        this.setState({
            loginData: formValue
        })
    }

    login = () => {
        this.setState({ loginErrorMessage: '' });
        const validate = this.refs.loginForm.getValue();
        if (!validate) {
            this.setState({ loginErrorMessage: 'Los datos del formulario son erroneos' });
            return;
        }
        firebase.auth().signInWithEmailAndPassword(validate.email, validate.password).then(() => {
            this.refs.toastLogin.show('Login correcto', 200, () => {
                this.props.navigation.goBack();
            })
        }).catch((error) => {
            let errorMessage;
            console.log(error.code);
            switch (error.code) {
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                    errorMessage = 'Credenciales incorrectas';
                    break;
                default:
                    errorMessage = 'Login incorrecto';
                    break;
            }
            this.refs.toastLogin.show(errorMessage, 2500);
        });
    }

    loginFacebook = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id, { permissions: FacebookApi.permissions }
        );
        if (type === 'success') {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credentials).then(() => {
                this.refs.toastLogin.show('Login correcto', 100, () => {
                    this.props.navigation.goBack();
                });
            }).catch(error => {
                this.refs.toastLogin.show('Error accediendo con facebook', 300);
            });
        } else if (type === 'cancel') {
            this.refs.toastLogin.show('Inicio de sesión cancelado', 300);
        } else {
            this.refs.toastLogin.show('Error desconocido', 300);
        }
    }

    render() {
        const { loginStruct, loginOptions, loginErrorMessage } = this.state;
        return (
            <View style={styles.viewBody}>
                <Image
                    source={require('../../../assets/img/FoodAdvisor-letras-logo.png')}
                    style={styles.logo}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode='contain'
                    containerStyle={styles.containerLogo}
                />
                <View style={styles.viewForm}>
                    <Form
                        ref='loginForm'
                        type={loginStruct}
                        options={loginOptions}
                        value={this.state.loginData}
                        onChange={(formValue) => this.onChangeFormLogin(formValue)}
                    />
                    <Button buttonStyle={styles.buttonLogin}
                        title='Entrar'
                        onPress={() => this.login()}
                    />
                    <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>

                    <Divider style={styles.divider} />

                    <SocialIcon
                        title='Inciar sesión con Facebook'
                        button type='facebook'
                        onPress={() => this.loginFacebook()}
                    />
                </View>
                <Toast
                    ref='toastLogin'
                    position='bottom'
                    positionValue={400}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40
    },
    logo: {
        width: 300,
        height: 150
    },
    viewForm: {
        marginTop: 50
    },
    buttonLogin: {
        backgroundColor: '#00a680',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    containerLogo: {
        alignItems: 'center'
    },
    loginErrorMessage: {
        color: '#f00',
        textAlign: 'center',
        marginTop: 20
    },
    divider: {
        backgroundColor: '#00a680',
        marginBottom: 20
    }
})