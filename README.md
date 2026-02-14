# Desarrollo Frontend III - Experiencia 2 Semana 6
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwind-css&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2.2.0-61DAFB?logo=biome&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-3.8.4-000000?logo=shadcn/ui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)

## Descripción del Proyecto

Este proyecto es una aplicación de gestión de viajes desarrollada como parte del curso Desarrollo Frontend III. Consiste en un frontend construido con Next.js y React, y un backend API desarrollado con Express.js y Node.js. La aplicación permite a los usuarios crear viajes y visualizar una lista de viajes organizados por estado (en proceso, confirmado, finalizado), además de borrar, filtrar por estado y contar con estados de carga que simulan retardos de red.

El frontend proporciona una interfaz de usuario moderna y responsiva utilizando Tailwind CSS y componentes de Shadcn UI. El backend maneja el almacenamiento de datos de viajes y la lógica de negocio correspondiente.

## Características Principales

- **Gestión de Viajes**: Crear nuevos viajes, listar viajes existentes y filtrarlos por estado.
- **Componentes SSR y CSR**: Utilización de componentes por el lado del servidor y cliente.
- **Interfaz Responsiva**: Diseño adaptativo que funciona en dispositivos móviles y de escritorio.
- **API RESTful**: Backend con endpoints para operaciones CRUD en viajes.
- **Validación de Datos**: Middleware para validar entradas en el backend.
- **Almacenamiento de Datos**: Datos almacenados en archivos JSON para simplicidad (adecuado para desarrollo y pruebas).
- **Skeletons y Suspense**: Páginas principales con `Suspense` y skeletons (`HomeSkeleton`, `CreateTravelSkeleton`) que simulan una demora de 5 segundos para mostrar escenarios de carga.
- **next/dynamic**: Carga diferida de componentes.

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

1. Clona el repositorio del frontend:
   ```bash
   git clone https://github.com/nisiara/dfe3_exp2_s6.git
   cd dfe3_exp2_s6
   ```

2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```

3. Clona el repositorio del backend (en paralelo al frontend):
   ```bash
   git clone https://github.com/nisiara/travel-backend.git
   cd travel-backend
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

2. En una nueva terminal, desde el directorio del frontend (`dfe3_exp2_s6`), inicia el servidor de desarrollo:
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
- `DELETE /api/travels/:id`: Elimina el vije por su id.


## Estructura del Proyecto

```
dfe3_exp2_s6/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Dashboard con TravelSummary + TravelList bajo Suspense
│   │   ├── create-travel/page.tsx   # Formulario (TravelCreateForm) con delay simulado   
│   ├── components/
│   │   ├── TravelManager.tsx        # Componente servidor que trae y filtra viajes
│   │   ├── TravelCreateForm.tsx     # Formulario cliente para crear viajes
│   │   ├── TravelSummary.tsx        # Cards con métricas
│   │   ├── TravelList.tsx           # Tabla con acciones (cambiar estado, eliminar)
│   │   ├── skeletons/               # HomeSkeleton, CreateTravelSkeleton
│   │   └── ui/                      # Componentes Shadcn UI
│   ├── lib/
│   │   ├── api.tsx                  # Fetchers hacia el backend
│   │   ├── types.ts                 # Interfaces
│   │   └── utils.ts                 # Helpers generales
│   └── hooks/
│       └── use-mobile.ts            # Hook para navegación responsive
├── public/
└── package.json

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

### Backend
- `npm run dev`: Inicia el servidor Express en modo desarrollo.
- `npm run start`: Levanta el servidor en modo producción.


---

*Desarrollado con* ❤️, 🤬, 😰  usando Next y un montón de cosas pulentas 😎.


