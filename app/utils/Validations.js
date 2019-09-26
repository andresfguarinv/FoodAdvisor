import t from 'tcomb-form-native';

export default formValidation = {
    email: t.refinement(t.String, value => {
        return /@/.test(value); // El texto debe contener @
    }),
    password: t.refinement(t.String, value => {
        return value.length >= 6; // La contraseña debe contener 6 o más caracteres
    })
}