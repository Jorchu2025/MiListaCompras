import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Calendar from 'expo-calendar/legacy';
import * as Contacts from 'expo-contacts/legacy';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddProductScreen() {
  const [producto, setProducto] = useState('');
  const [imagenUri, setImagenUri] = useState<string | null>(null);

  const [ubicacion, setUbicacion] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
const [contacto, setContacto] = useState<string | null>(null);

const [contactos, setContactos] = useState<
  { id: string; name?: string | null }[]
>([]);

const [mostrarContactos, setMostrarContactos] = useState(false);




  const seleccionarImagen = async () => {
    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      alert('Necesitamos permiso para acceder a la galería.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagenUri(resultado.assets[0].uri);
    }
  };

  const obtenerUbicacion = async () => {
    const permiso = await Location.requestForegroundPermissionsAsync();

    if (permiso.status !== 'granted') {
      alert('Necesitamos permiso para acceder a tu ubicación.');
      return;
    }

    const posicion = await Location.getCurrentPositionAsync({});

    setUbicacion({
      latitude: posicion.coords.latitude,
      longitude: posicion.coords.longitude,
    });
  };

  
const seleccionarContacto = async () => {
  alert('Entró a seleccionarContacto');
  
  const permiso = await Contacts.requestPermissionsAsync();

  if (permiso.status !== 'granted') {
    alert('Necesitamos permiso para acceder a tus contactos.');
    return;
  }

  const respuesta = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name],
  });

  const contactosDisponibles = respuesta.data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  setContactos(contactosDisponibles);
  setMostrarContactos(true);
};

const agregarAlCalendario = async () => {
  if (!producto.trim()) {
    alert('Primero ingresá un producto.');
    return;
  }

  const permiso = await Calendar.requestCalendarPermissionsAsync();

  if (permiso.status !== 'granted') {
    alert('Necesitamos permiso para acceder al calendario.');
    return;
  }

  const calendarios = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );

  const calendarioDisponible = calendarios.find(
    (item) => item.allowsModifications
  );

  if (!calendarioDisponible) {
    alert('No encontramos un calendario disponible para crear eventos.');
    return;
  }

  const inicio = new Date();
  inicio.setMinutes(inicio.getMinutes() + 5);

  const fin = new Date(inicio.getTime() + 30 * 60 * 1000);

  await Calendar.createEventAsync(calendarioDisponible.id, {
    title: `🛒 Comprar ${producto}`,
    startDate: inicio,
    endDate: fin,
    notes: `Recordatorio de compra para: ${producto}`,
  });

  alert('Evento agregado al calendario.');
};




  const handleAddProduct = async () => {
    const productosGuardados =
      await AsyncStorage.getItem('productos');

    const productos = productosGuardados
      ? JSON.parse(productosGuardados)
      : [];

    productos.push({
      nombre: producto,
      imagen: imagenUri,
      ubicacion: ubicacion,
      contacto: contacto,
    });

    await AsyncStorage.setItem(
      'productos',
      JSON.stringify(productos)
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>

      <Text style={styles.title}>Agregar producto</Text>

      <Text style={styles.subtitle}>
        Sumá un producto a tu lista
      </Text>

      <Text style={styles.label}>Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Leche"
        value={producto}
        onChangeText={setProducto}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddProduct}
      >
        <Text style={styles.addButtonText}>
          AGREGAR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={seleccionarImagen}
      >
        <Text style={styles.addButtonText}>
          🖼️ SELECCIONAR FOTO
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={obtenerUbicacion}
      >
        <Text style={styles.addButtonText}>
          📍 OBTENER UBICACIÓN
        </Text>
      </TouchableOpacity>

<TouchableOpacity
  style={styles.addButton}
  onPress={agregarAlCalendario}
>
  <Text style={styles.addButtonText}>
    📅 AGREGAR RECORDATORIO
  </Text>
</TouchableOpacity>


      <TouchableOpacity
  style={styles.addButton}
  onPress={seleccionarContacto}
>
  <Text style={styles.addButtonText}>
    👤 SELECCIONAR CONTACTO
  </Text>
</TouchableOpacity>

{mostrarContactos && (
  <View style={styles.contactList}>
    <Text style={styles.contactTitle}>
      Seleccioná un contacto:
    </Text>

    {contactos.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.contactItem}
        onPress={() => {
          setContacto(item.name ?? 'Contacto seleccionado');
          setMostrarContactos(false);
        }}
      >
        <Text style={styles.contactItemText}>
          👤 {item.name ?? 'Sin nombre'}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)}


      {ubicacion && (
        <Text style={styles.locationText}>
          📍 Latitud: {ubicacion.latitude}
          {'\n'}
          Longitud: {ubicacion.longitude}
        </Text>
      )}

{contacto && (
  <Text style={styles.contactText}>
    👤 Contacto: {contacto}
  </Text>
)}



      <Link href="/home" asChild>
        <TouchableOpacity>
          <Text style={styles.backText}>
            VOLVER A MI LISTA
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

  addButton: {
    backgroundColor: '#B5838D',
    borderRadius: 15,
    padding: 17,
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  locationText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#7A9B8A',
    fontSize: 14,
  },

  backText: {
    textAlign: 'center',
    color: '#7A9B8A',
    fontWeight: 'bold',
    marginTop: 25,
  },

contactText: {
  marginTop: 12,
  textAlign: 'center',
  color: '#7A9B8A',
  fontSize: 14,
},

contactList: {
  marginTop: 12,
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 10,
},

contactTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#8B5E65',
  marginBottom: 8,
},

contactItem: {
  padding: 10,
  borderRadius: 8,
  marginBottom: 6,
  backgroundColor: '#F7F3F0',
},

contactItemText: {
  fontSize: 14,
  color: '#444444',
},

});
