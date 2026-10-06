import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function LoginScreen() {

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();


const handleLogin = async () => {
  
  const usuarioGuardado = await AsyncStorage.getItem('usuario');
  const contrasenaGuardada = await AsyncStorage.getItem('contrasena');

  if (usuario === usuarioGuardado && contrasena === contrasenaGuardada) {
  await AsyncStorage.setItem('usuarioLogueado', 'true');

  router.replace('/home');
  } 
  else {
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  }
};

 return (
    <View style={styles.container}>

      <Text style={styles.icon}>🛒</Text>

      <Text style={styles.title}>Mi Lista de Compras</Text>

      <Text style={styles.subtitle}>
        Ingresá para continuar
      </Text>

      <Text style={styles.label}>Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
       />

      <TouchableOpacity
  style={styles.loginButton}
  onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>INGRESAR</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        ¿No tenés una cuenta?
      </Text>

      <Link href="/register" asChild>
  <TouchableOpacity>
    <Text style={styles.registerButton}>REGISTRATE</Text>
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

  loginButton: {
    backgroundColor: '#B5838D',
    borderRadius: 15,
    padding: 17,
    alignItems: 'center',
    marginTop: 10,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  registerText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 25,
  },

  registerButton: {
    textAlign: 'center',
    color: '#7A9B8A',
    fontWeight: 'bold',
    marginTop: 8,
  },
});