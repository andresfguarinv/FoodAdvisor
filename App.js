import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 2. Importar firebase y archivo de configuración
import firebaseConfig from './app/utils/Firebase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig);

// Importar navegación
import UserNavigation from './app/navigations/User';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UserNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
