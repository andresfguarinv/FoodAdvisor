import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements'
import { LoginStruct, LoginOptions } from '../../forms/Login'
import t from 'tcomb-form-native'
const Form = t.form.Form;

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
        console.log(this.state.loginData);
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
                </View>
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
    }
})