# Back-End del Juego de Matemáticas

Este es el backend de un juego de matemáticas que permite la autenticación de usuarios, manejo de puntuaciones, niveles, historial, y más. El proyecto está desarrollado en Node.js y TypeScript, utilizando tecnologías como Express, JWT, bcrypt y MongoDB.

## URL del Despliegue

El backend del proyecto está desplegado en Vercel y puedes acceder a la API mediante la siguiente URL:

[https://juego-math-back.vercel.app/api-docs](https://juego-math-back.vercel.app/api-docs)

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **TypeScript**: Superconjunto de JavaScript que añade tipado estático.
- **Express**: Framework para construir aplicaciones web con Node.js.
- **JWT (JSON Web Tokens)**: Para la autenticación y protección de rutas.
- **bcrypt.js**: Para el cifrado de contraseñas.
- **MongoDB y Mongoose**: Base de datos NoSQL y ODM para interactuar con MongoDB.
- **dotenv**: Manejo de variables de entorno.
- **cors**: Manejo de solicitudes de distintos orígenes.
- **ts-node-dev**: Herramienta para desarrollo en TypeScript con recarga en tiempo real.

## Requisitos Previos

- Node.js (versión 18 o superior)
- MongoDB (puedes usar una base de datos local o en la nube, como MongoDB Atlas)
- Vercel CLI si deseas desplegarlo en Vercel

## Variables de Entorno

Asegúrate de configurar un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
JWT_SECRET=tu_secreto_para_jwt
DB_CONFIG=tu_url_de_mongodb
```

- **JWT_SECRET**: La clave secreta que usarás para generar y verificar los tokens JWT.
- **DB_CONFIG**: La URL de conexión de tu base de datos MongoDB. Ejemplo:

  ```bash
  mongodb+srv://usuario:password@cluster0.mongodb.net/juego_math?retryWrites=true&w=majority
  ```

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/OmarRMC/juego-math-back.git
   cd juego-math-back 
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Crea el archivo `.env` en la raíz del proyecto con las variables de entorno proporcionadas arriba.

4. Compila el código TypeScript (opcional):

   ```bash
   npm run tsc
   ```

5. Ejecuta el proyecto en modo desarrollo:

   ```bash
   npm run dev
   ```

6. Si deseas ejecutar el código compilado (producción):

   ```bash
   npm start
   ```
7. Si deseas compilar el código compilado TypeScript con archivos staticos (Opcional):

   ```bash
   npm run build

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga en caliente.
- `npm start`: Inicia el servidor con el código compilado.
- `npm run tsc`: Compila el código TypeScript a JavaScript.
- `npm run lint`: Ejecuta linter (ts-standard) para revisar errores de formato y estilo.

## Despliegue en Vercel

Este proyecto está configurado para ser desplegado en Vercel. Sigue estos pasos para desplegarlo:

1. Instala Vercel CLI si aún no lo has hecho:

   ```bash
   npm install -g vercel
   ```

2. Inicia sesión en Vercel:

   ```bash
   vercel login
   ```

3. Despliega el proyecto:

   ```bash
   vercel
   ```
