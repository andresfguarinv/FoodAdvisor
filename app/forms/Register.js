import React from 'react';
import t from 'tcomb-form-native';
import formValidation from '../utils/Validations';
import { form } from 'tcomb-form-native/lib';

// Estructura modelo
export const RegisterStruct = t.struct({
    name: t.String,
    email: formValidation.email,
    password: formValidation.password,
    passwordConfirmation: formValidation.password
});

// Opciones
export const RegisterOptions = {
    fields: {
        name: {
            label: "Nombre (*)",
            placeholder: "Escribe tu nombre y apellidos",
            error: "Nombre inválido"
        },
        email: {
            label: "Email (*)",
            placeholder: "Escribe tu email",
            error: "Email inválido"
        },
        password: {
            label: "Contraseña (*)",
            placeholder: "Escribe tu contraseña",
            error: "Contraseña inválida",
            password: true,
            secureTextEntry: true
        },
        passwordConfirmation: {
            label: "Repetir contraseña (*)",
            placeholder: "Repite tu contraseña",
            error: "Contraseña inválida",
            password: true,
            secureTextEntry: true
        }
    }
}