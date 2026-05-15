## Aplicación Full Stack de Gestión de Tareas


Descripción general

OpsFlow es una aplicación full-stack de gestión de tareas construida con:

React (Frontend)
Flask (Backend API)
SQLite (Base de datos)
Autenticación con JWT
Scripts de automatización en PowerShell



Estado actual del proyecto
Funcionalidades completadas
Backend
API REST con Flask
Integración con SQLite
Autenticación con JWT
Registro de usuarios
Login de usuarios
Rutas protegidas
Crear tareas
Leer tareas
Actualizar tareas
Eliminar tareas
Migraciones con Flask-Migrate
CORS habilitado
Frontend
Estructura base en React
Pantalla de login
Pantalla de registro
Dashboard principal
Formulario de creación de tareas
Renderizado de tareas
Manejo de token JWT
Logout
Conexión con API backend
DevOps / Scripts

# Tecnologías utilizadas
Frontend
React
JavaScript
CSS
Backend
Python
Flask
Flask-JWT-Extended
Flask-Bcrypt
Flask-SQLAlchemy
Flask-Migrate
Flask-CORS
Base de datos
SQLite
Herramientas
Git
GitHub
PowerShell
npm
pip
# Estructura del proyecto
Final-Ops/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   └── migrations/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── scripts/
│   ├── deploy.ps1
│   ├── monitor.ps1
│   ├── backup-db.ps1
│   ├── seed.ps1
│   └── start-dev.ps1
│
├── .gitignore
└── README.md
# Cómo ejecutar el proyecto
1. Clonar el repositorio
git clone https://github.com/Jorgeotero1998/Final-Ops.git
Configuración del backend
2. Entrar a la carpeta backend
cd backend
3. Crear entorno virtual
python -m venv venv
4. Activar entorno virtual
PowerShell (Windows)
venv\Scripts\activate
5. Instalar dependencias
pip install -r requirements.txt
6. Ejecutar servidor Flask
flask run

El backend correrá en:

http://127.0.0.1:5000
Configuración del frontend
7. Abrir nueva terminal

Entrar a la carpeta frontend:

cd frontend
8. Instalar dependencias
npm install
9. Iniciar React
npm start

El frontend correrá en:

http://localhost:3000
Problemas actuales / mejoras necesarias
Diseño UI / UX

La interfaz actual es funcional pero necesita mejoras:

Mejor diseño visual
Layout responsivo
Dashboard más profesional
Mejor espaciado y alineación
Componentes modernos (cards, botones)
Optimización mobile
Funcionalidades planeadas para la versión final
Mejoras prioritarias
Frontend
Rediseño moderno de UI
Dashboard responsivo
Mejor arquitectura CSS
Modo oscuro
Estados de carga
Mejor manejo de errores
Backend
Validaciones más robustas
Roles de usuario
Seguridad JWT mejorada
Variables de entorno (.env)
Migración a PostgreSQL
Documentación de API
Funcionalidades avanzadas
Búsqueda de tareas
Filtros
Categorías
Fechas límite reales
Kanban con drag & drop
Notificaciones
Perfil de usuario
Dashboard de analíticas
Objetivos de despliegue
Frontend

Deploy en:

Vercel
Netlify
Backend

Deploy en:

Render
Railway
