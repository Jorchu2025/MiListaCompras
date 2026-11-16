import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type Producto = {
  nombre: string;
  imagen: string | null;
  ubicacion: {
    latitude: number;
    longitude: number;
  } | null;
  contacto: string | null;
};

type ProductStore = {
  productos: Producto[];

  cargarProductos: () => Promise<void>;
  agregarProducto: (producto: Producto) => Promise<void>;
  eliminarProducto: (index: number) => Promise<void>;
  actualizarProducto: (
    index: number,
    producto: Producto
  ) => Promise<void>;
};

const guardarProductos = async (productos: Producto[]) => {
  await AsyncStorage.setItem(
    'productos',
    JSON.stringify(productos)
  );
};

export const useProductStore = create<ProductStore>((set, get) => ({
  productos: [],

  cargarProductos: async () => {
    const productosGuardados =
      await AsyncStorage.getItem('productos');

    if (!productosGuardados) {
      set({ productos: [] });
      return;
    }

    const datos = JSON.parse(productosGuardados);

    const productosConvertidos = datos.map(
      (producto: string | Producto) =>
        typeof producto === 'string'
          ? {
              nombre: producto,
              imagen: null,
              ubicacion: null,
              contacto: null,
            }
          : producto
    );

    set({ productos: productosConvertidos });
  },

  agregarProducto: async (producto) => {
    const nuevosProductos = [
      ...get().productos,
      producto,
    ];

    set({ productos: nuevosProductos });

    await guardarProductos(nuevosProductos);
  },

  eliminarProducto: async (index) => {
    const nuevosProductos = get().productos.filter(
      (_, i) => i !== index
    );

    set({ productos: nuevosProductos });

    await guardarProductos(nuevosProductos);
  },

  actualizarProducto: async (index, producto) => {
    const nuevosProductos = [...get().productos];

    nuevosProductos[index] = producto;

    set({ productos: nuevosProductos });

    await guardarProductos(nuevosProductos);
  },
}));