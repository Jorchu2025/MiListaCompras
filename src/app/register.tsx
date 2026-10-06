import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
 

 

export default function RegisterScreen() {
    const handleRegister = async () => {
  await AsyncStorage.setItem('usuario', usuario);
  await AsyncStorage.setItem('contrasena', contrasena);
};

    const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>🛒</Text>

      <Text style={styles.title}>Crear cuenta</Text>

      <Text style={styles.subtitle}>
        Registrate para comenzar
      </Text>

      <Text style={styles.label}>Usuario</Text>

      <TextInput
       style={styles.input}
       placeholder="Elegí un usuario"
       value={usuario}
       onChangeText={setUsuario}
       />

      <Text style={styles.label}>Contraseña</Text>

      <TextInput
       style={styles.input}
       placeholder="Elegí una contraseña"
       secureTextEntry
       value={contrasena}
       onChangeText={setContrasena}
       />
 
   <TouchableOpacity
  style={styles.registerButton}
  onPress={handleRegister}
     >
  <Text style={styles.registerButtonText}>REGISTRARME</Text>
  </TouchableOpacity>

      <Link href="/login" asChild>
  <TouchableOpacity>
    <Text style={styles.loginText}>
      Ya tengo una cuenta
    </Text>
  </TouchableOpacity>
</Link>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3F0',
    padding: 24,
    justifyContent: 'center',
  },

  icon: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7A9B8A',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 35,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5E65',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 18,
  },

  registerButton: {
    backgroundColor: '#B5838D',
    borderRadius: 15,
    padding: 17,
    alignItems: 'center',
    marginTop: 10,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  loginText: {
    textAlign: 'center',
    color: '#7A9B8A',
    fontWeight: 'bold',
    marginTop: 25,
  },
});
