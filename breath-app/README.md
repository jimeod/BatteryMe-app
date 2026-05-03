# BatteryMe 🌿

Aplicación móvil de bienestar emocional que te ayuda a monitorear y mejorar tu energía emocional diaria a través de actividades guiadas.

---

## Tecnologías

**Frontend:** Vue 3, Vite, JavaScript  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Autenticación:** JWT (JSON Web Tokens)

---

## Requisitos previos

- Node.js v20 o superior
- MongoDB corriendo localmente en `localhost:27017`
- npm

---

## Estructura del proyecto

```
breath-app/
├── src/                  ← Frontend Vue
│   ├── api.js            ← Llamadas al backend
│   ├── useStore.js       ← Estado global
│   ├── App.vue
│   └── components/
├── backend/              ← API REST Express
│   ├── server.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── .env                  ← Variables de entorno frontend
└── package.json
```

---

## Instalación

### 1. Clona el repositorio

```bash
git clone git@github.com:jimeod/breath-app.git
cd breath-app
```

### 2. Instala dependencias del frontend

```bash
npm install
```

### 3. Instala dependencias del backend

```bash
cd backend
npm install
cd ..
```

---

## Variables de entorno

### Frontend — `.env` (en la raíz del proyecto)

```env
VITE_API_URL=http://localhost:5001/api
```

### Backend — `backend/.env`

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/breathe_app
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRES_IN=7d
```

---

## Ejecutar el proyecto

Necesitas **dos terminales** abiertas al mismo tiempo.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Deberías ver:

```
 Servidor corriendo en http://localhost:5001
 MongoDB conectado: localhost
```

### Terminal 2 — Frontend

```bash
npm run dev
```

Deberías ver:

```
VITE v6.x  ready in Xms
➜  Local: http://localhost:5173/
```

Abre `http://localhost:5173` en el navegador.

---

## Funcionalidades

- **Registro e inicio de sesión** con JWT
- **Batería emocional** — porcentaje que sube al completar actividades diarias
- **6 actividades diarias:** respiración guiada, check-in emocional, pausa activa, autocuidado, pensamiento positivo, descanso digital
- **Check-in emocional** — registra tu estado de ánimo con emoji y nota
- **Pensamientos positivos** — escribe y guarda reflexiones del día
- **Racha semanal** — seguimiento de días completados
- **Descompletar actividades** — puedes revertir el progreso de una actividad
- **Auto-login** — la sesión se mantiene activa entre visitas
- **Reset diario** — las actividades se reinician cada día automáticamente

---

## API Endpoints

### Auth

| Método | Ruta                 | Descripción       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Registrar usuario |
| POST   | `/api/auth/login`    | Iniciar sesión    |

### Perfil

| Método | Ruta                        | Descripción            |
| ------ | --------------------------- | ---------------------- |
| GET    | `/api/profile`              | Obtener perfil         |
| PUT    | `/api/profile`              | Actualizar nombre      |
| POST   | `/api/profile/activity/:id` | Completar actividad    |
| DELETE | `/api/profile/activity/:id` | Descompletar actividad |

### Checkins

| Método | Ruta            | Descripción              |
| ------ | --------------- | ------------------------ |
| POST   | `/api/checkins` | Crear check-in emocional |
| GET    | `/api/checkins` | Obtener historial        |

### Pensamientos

| Método | Ruta            | Descripción       |
| ------ | --------------- | ----------------- |
| POST   | `/api/thoughts` | Crear pensamiento |
| GET    | `/api/thoughts` | Obtener historial |

### Health Check

| Método | Ruta          | Descripción                           |
| ------ | ------------- | ------------------------------------- |
| GET    | `/api/health` | Verificar que el servidor está activo |

---

## Verificar que funciona

```bash
curl http://localhost:5001/api/health
# {"status":"ok","message":"Breathe API running"}
```
