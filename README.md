# Desarrollo Frontend III - Experiencia 2 Semana 5
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-25-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwind-css&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2.2.0-E10098?logo=biome&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-3.8.4-000000?logo=shadcn/ui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)

## Descripción del Proyecto

Este proyecto es una aplicación de gestión de viajes desarrollada como parte del curso Desarrollo Frontend III. Consiste en un frontend construido con Next.js y React, y un backend API desarrollado con Express.js y Node.js. La aplicación permite a los usuarios crear viajes y visualizar una lista de viajes organizados por estado (en proceso, confirmado, finalizado).

El frontend proporciona una interfaz de usuario moderna y responsiva utilizando Tailwind CSS y componentes de Shadcn UI. El backend maneja el almacenamiento de datos de viajes y la lógica de negocio correspondiente.

## Características Principales

- **Gestión de Viajes**: Crear nuevos viajes y listar viajes existentes filtrados por estado.
- **Componentes SSR y CSR**: Utilización de componentes por el lado del servidor y cliente.
- **Interfaz Responsiva**: Diseño adaptativo que funciona en dispositivos móviles y de escritorio.
- **API RESTful**: Backend con endpoints para operaciones CRUD en viajes.
- **Validación de Datos**: Middleware para validar entradas en el backend.
- **Almacenamiento de Datos**: Datos almacenados en archivos JSON para simplicidad (adecuado para desarrollo y pruebas).

## Tecnologías Utilizadas

### Frontend
- **Next.js 16.1.6**: Framework de React para aplicaciones web.
- **React 19.2.3**: Biblioteca para construir interfaces de usuario.
- **TypeScript 5.0**: Superset de JavaScript con tipado estático.
- **Tailwind CSS 4**: Framework de CSS para estilos utilitarios.
- **Shadcn UI 3.8.4**: Componentes de UI reutilizables.
- **Biome 2.2.0**: Herramienta para linting y formateo de código.

### Backend
- **Node.js 25**: Entorno de ejecución de JavaScript.
- **Express.js 5.2.1**: Framework web para Node.js.
- **CORS**: Para manejo de solicitudes cross-origin.
- **Morgan**: Middleware para logging de solicitudes HTTP.

## Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** o **pnpm** o **bun** (gestor de paquetes)
- Un navegador web moderno

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/nisiara/dfe3_exp2_s5.git
   cd dfe3_exp2_s5
   ```

2. Instala las dependencias del frontend:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. Navega al directorio del backend:
   ```bash
   cd ../travel-backend
   ```

4. Instala las dependencias del backend:
   ```bash
   npm install
   ```

## Ejecución de la Aplicación

1. Inicia el servidor backend:
   ```bash
   npm run dev
   ```
   El backend estará disponible en `http://localhost:3001`.

2. En una nueva terminal, desde el directorio del frontend (`dfe3_exp2_s5`), inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Endpoints de la API

### Viajes
- `POST /api/travels`: Crear un nuevo viaje.
- `GET /api/travels`: Obtener todos los viajes.
- `PATCH /api/travels/:id/status`: Actualizar el estado de un viaje.
- `GET /api/travels/status/:status`: Obtener viajes por estado (en proceso, confirmado, finalizado).

## Estructura del Proyecto

```
dfe3_exp2_s5/ (Frontend)
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Página principal
│   │   ├── create-travel/page.tsx   # Página para crear viajes
│   │   └── list-travels/page.tsx    # Página para listar viajes
│   ├── components/
│   │   ├── ui/                      # Componentes de UI (Shadcn)
│   │   ├── form-travels.tsx         # Formulario para viajes
│   │   ├── table-travels.tsx        # Tabla de viajes
│   │   └── ...                      # Otros componentes
│   ├── lib/
│   │   ├── api.tsx                  # Funciones para llamadas a la API
│   │   └── utils.ts                 # Utilidades
│   └── hooks/
│       └── use-mobile.ts            # Hook personalizado
├── public/                          # Archivos estáticos
└── package.json                     # Dependencias y scripts

```

## Scripts Disponibles

### Frontend
- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia el servidor de producción.
- `npm run lint`: Ejecuta el linter (Biome).
- `npm run lint:fix`: Corrige automáticamente errores de linting.
- `npm run format`: Formatea el código.
- `npm run check`: Verifica el código con Biome.


---

*Desarrollado con* ❤️, 🤬, 😰  usando Next y un montón de cosas pulentas 😎.


