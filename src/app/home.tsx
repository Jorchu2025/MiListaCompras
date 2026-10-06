import AsyncStorage from '@react-native-async-storage/async-storage';


import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProductItem from '../components/ProductItem';






export default function HomeScreen() {
  const router = useRouter();
  const [productos, setProductos] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState('');

  


  useEffect(() => {
  const verificarSesion = async () => {
    const sesion = await AsyncStorage.getItem('usuarioLogueado');

    if (sesion !== 'true') {
      router.replace('/login');
    }
  };

  verificarSesion();
}, []);

const handleLogout = async () => {
  await AsyncStorage.removeItem('usuarioLogueado');

  router.replace('/login');
};


    useEffect(() => {
    const cargarProductos = async () => {
      const productosGuardados = await AsyncStorage.getItem('productos');

      if (productosGuardados) {
        setProductos(JSON.parse(productosGuardados));
      }
    };

    cargarProductos();
  }, []);
  
  const handleDeleteProduct = async (index: number) => {
  const nuevosProductos = productos.filter(
    (_, i) => i !== index
  );

  setProductos(nuevosProductos);

  await AsyncStorage.setItem(
    'productos',
    JSON.stringify(nuevosProductos)
  );
};

const productosFiltrados = productos.filter((producto) =>
  producto.toLowerCase().includes(busqueda.toLowerCase())
);

return (
  <View style={styles.container}>

    <Text style={styles.title}>🛒 Mi Lista de Compras</Text>

    <Text style={styles.subtitle}>
      Todo lo que necesitás para tus compras
    </Text>

    <TextInput
      style={styles.searchInput}
      placeholder="🔍 Buscar producto..."
      value={busqueda}
      onChangeText={setBusqueda}
    />

    <Text style={styles.sectionTitle}>
      MIS PRODUCTOS
    </Text>

    {productosFiltrados.map((producto) => (
      <ProductItem
        key={producto}
        producto={producto}
        onDelete={() => {
          const indexOriginal = productos.indexOf(producto);
          handleDeleteProduct(indexOriginal);
        }}
      />
    ))}



<TouchableOpacity
  style={styles.logoutButton}
  onPress={handleLogout}
>
  <Text style={styles.logoutButtonText}>
        CERRAR SESIÓN
      </Text>
    </TouchableOpacity>

    <Link href="/add-product" asChild>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>
          ＋ AGREGAR PRODUCTO
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
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7A9B8A',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
    marginBottom: 25,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5E65',
    marginBottom: 12,
  },

  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productName: {
    fontSize: 17,
    color: '#444444',
  },

  deleteButton: {
    fontSize: 20,
    color: '#8B5E65',
  },

  addButton: {
    backgroundColor: '#B5838D',
    borderRadius: 15,
    padding: 17,
    alignItems: 'center',
    marginTop: 15,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

logoutButton: {
  marginTop: 12,
  alignItems: 'center',
},

logoutButtonText: {
  color: '#B5838D',
  fontSize: 14,
  fontWeight: '600',
},

});

