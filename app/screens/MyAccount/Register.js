import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
// Importar formulario
import { RegisterStruct, RegisterOptions } from '../../forms/Register'
import t from 'tcomb-form-native'
const Form = t.form.Form;
// Importar firebase
import * as firebase from 'firebase'
// Importar toast
import Toast, { DURATION } from 'react-native-easy-toast'

export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            registerStruct: RegisterStruct,
            registerOptions: RegisterOptions,
            // 5. Para asignar la información del formulario se deben agregar al state 
            formData: {},
            // 10. Variable para almacenar los mensajes de validación y lo agregamos en el render en un elemento text
            formErrorMessage: ""
        };
    }

    // 7. Función para el boton del login que valida el formulario 
    register = () => {
        const { password, passwordConfirmation } = this.state.formData;
        if (password === passwordConfirmation) {
            const validate = this.refs.registerForm.getValue(); // Valida el formulario al traer los valores
            if (validate) {
                this.setState({ formErrorMessage: `` });
                firebase.auth().createUserWithEmailAndPassword(validate.email, validate.password).then(result => {
                    this.refs.toast.show('Registo correcto', 200, () => {
                        this.props.navigation.goBack();
                        // this.props.navigation.navigate('MyAccount');
                    });
                }).catch(error => {
                    this.refs.toast.show('Registro de usuario inválido');
                });
            } else {
                this.setState({ formErrorMessage: `Formulario inválido` });
            }
        }
        else {
            this.setState({ formErrorMessage: `Las contraseñas no son iguales` });
        }
    }

    // 6. Funcion que se debe asignar al formulario para que cada vez que se escriba almanecenar la información en nuestro objeto
    onChangeFormRegister = (formValue) => {
        this.setState({ formData: formValue });
    }

    render() {
        const { registerStruct, registerOptions, formErrorMessage } = this.state;
        return (
            <View style={styles.viewBody}>
                <Form
                    ref="registerForm"
                    type={registerStruct}
                    options={registerOptions}
                    value={this.state.formData}
                    onChange={(formValue) => this.onChangeFormRegister(formValue)} />
                <Button
                    buttonStyle={styles.buttonRegisterContainer}
                    title="Unirse"
                    onPress={() => this.register()} />
                <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
                <Toast
                    ref='toast'
                    position='bottom'
                    positionValue={250}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }}>
                </Toast>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40
    },
    buttonRegisterContainer: {
        backgroundColor: "#00a680",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    formErrorMessage: {
        color: "#f00",
        textAlign: "center",
        marginTop: 30
    }
});