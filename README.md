# 🛒 Mi Lista de Compras

Aplicación móvil desarrollada con React Native, Expo y TypeScript como proyecto para la materia Aplicaciones Móviles.
La aplicación fue desarrollada y probada utilizando un emulador Android.

## 📱 Descripción

Mi Lista de Compras permite al usuario registrarse e iniciar sesión y administrar una lista de productos de manera sencilla.

La aplicación utiliza almacenamiento local para conservar la información del usuario y los productos.

## ✨ Funcionalidades

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
- Pruebas automáticas con Jest y React Native Testing Library.

## 🛠️ Tecnologías utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
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
└── components/
    └── ProductItem.tsx

__tests__/
└── ProductItem.test.tsx

