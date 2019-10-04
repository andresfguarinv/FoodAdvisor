import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
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
            formData: {}
        };
    }

    // 7. Función para el boton del login que valida el formulario 
    register = () => {
        const { password, passwordConfirmation } = this.state.formData;
        if (password === passwordConfirmation) {
            const validate = this.refs.registerForm.getValue(); // Valida el formulario al traer los valores
            if (validate) {
                console.log(this.state.formData);
            } else {
                console.log(`Formulario Inválido`);
            }
        }
        else {
            console.log(`Las contraseñas no son iguales`);
        }
    }

    // 6. Funcion que se debe asignar al formulario para que cada vez que se escriba almanecenar la información en nuestro objeto
    onChangeFormRegister = (formValue) => {
        this.setState({
            formData: formValue
        });
        // console.log(this.state.formData);
    }

    render() {
        const { registerStruct, registerOptions } = this.state;
        return (
            <View style={styles.viewBody}>
                <Form
                    ref="registerForm"
                    type={registerStruct}
                    options={registerOptions}
                    value={this.state.formData}
                    onChange={(formValue) => this.onChangeFormRegister(formValue)} />
                <Button
                    title="Unirse"
                    onPress={() => this.register()} />
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
    }
});