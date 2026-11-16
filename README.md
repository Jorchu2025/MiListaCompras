# 🛒 Mi Lista de Compras

Aplicación móvil desarrollada con **React Native, Expo y TypeScript** como proyecto para la materia **Aplicaciones Móviles**.

La aplicación permite administrar una lista de productos y acceder a recursos del dispositivo, como cámara/galería, ubicación, contactos y calendario.

## 📱 Descripción

**Mi Lista de Compras** permite al usuario registrarse e iniciar sesión y administrar una lista de productos de manera sencilla.

La aplicación utiliza **AsyncStorage** para conservar los datos y **Zustand** para gestionar de manera global el estado de la lista de productos.

## ✨ Funcionalidades

### Parcial 1

- Registro de usuario y contraseña.
- Inicio de sesión con validación local.
- Protección de acceso al Home.
- Agregar productos.
- Visualizar productos.
- Buscar productos.
- Eliminar productos.
- Persistencia de datos mediante AsyncStorage.
- Cerrar sesión.
- Componente reutilizable `ProductItem`.
- Notificaciones locales.

### Parcial 2

- 📷 Selección de imágenes desde la galería mediante `expo-image-picker`.
- 📍 Obtención de la ubicación actual mediante `expo-location`.
- 👤 Acceso y selección de contactos mediante `expo-contacts`.
- 📅 Creación de recordatorios/eventos en el calendario mediante `expo-calendar`.
- 🔐 Solicitud y validación de permisos antes de utilizar los recursos del dispositivo.
- 🌐 Estado global de productos mediante **Zustand**.
- ➕ Acción para agregar productos desde el store.
- 🗑️ Acción para eliminar productos desde el store.
- 🔄 Acción para actualizar productos desde el store.
- 💾 Persistencia de productos mediante AsyncStorage.
- 🧪 Testing automatizado con **Jest** y **React Native Testing Library**.
- ✅ 3 tests automatizados implementados.

## 🛠️ Tecnologías utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- Zustand
- Expo Image Picker
- Expo Location
- Expo Contacts
- Expo Calendar
- Expo Notifications
- Jest
- React Native Testing Library

## 📂 Estructura principal

```text
src/
├── app/
│   ├── login.tsx
│   ├── register.tsx
│   ├── home.tsx
│   └── add-product.tsx
│
├── components/
│   └── ProductItem.tsx
│
├── store/
│   └── productStore.ts
│
└── utils/
    └── productValidation.ts

__tests__/
└── ProductItem.test.tsx
```

## ▶️ Cómo ejecutar la aplicación

Instalar las dependencias del proyecto:

```bash
npm install
```

Iniciar el proyecto con Expo:

```bash
npx expo start --dev-client
```

La aplicación puede ejecutarse utilizando el **Development Build** instalado en un dispositivo Android o en un emulador Android.

## 🧪 Cómo ejecutar los tests

Ejecutar:

```bash
npm test
```

Los tests implementados verifican:

1. La correcta visualización del nombre del producto.
2. La ejecución de la acción `onDelete` al presionar el botón de eliminar.
3. La validación del nombre de un producto.

## ✅ Estado del proyecto

La aplicación integra las funcionalidades requeridas para el Parcial 2 de **Aplicaciones Móviles**, incluyendo recursos del dispositivo, estado global con Zustand y testing automatizado con Jest.

## 👩‍💻 Autora

Proyecto realizado para la materia **Aplicaciones Móviles**.