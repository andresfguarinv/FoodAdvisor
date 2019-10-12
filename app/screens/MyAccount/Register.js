import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
// Importar formulario
import { RegisterStruct, RegisterOptions } from '../../forms/Register'
import t from 'tcomb-form-native'
const Form = t.form.Form;

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
                console.log(this.state.formData);
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