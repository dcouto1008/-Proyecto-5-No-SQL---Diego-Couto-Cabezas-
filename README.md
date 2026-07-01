# Proyecto 5 - noSQL: API REST Movies 🎬

**Autor:** Diego Couto Cabezas  
**Stack:** Node.js · Express · MongoDB · Mongoose

---

## Estructura del proyecto

```
proyecto5-noSQL/
├── src/
│   ├── controllers/
│   │   └── movie.controller.js   # Lógica de cada endpoint (CRUD)
│   ├── models/
│   │   └── movie.model.js        # Schema de Mongoose para Movie
│   └── routes/
│       └── movie.routes.js       # Definición de rutas de la API
├── index.js                      # Entrada: Express + conexión MongoDB
├── .env.example                  # Variables de entorno de ejemplo
├── .gitignore
└── package.json
```

---

## Instalación y arranque

### 1. Clona el repositorio e instala dependencias

```bash
git clone <url-del-repo>
cd proyecto5-noSQL
npm install
```

### 2. Configura las variables de entorno

Copia `.env.example` y renómbralo `.env`:

```bash
cp .env.example .env
```

Rellena tu URI de MongoDB Atlas en el `.env`:

```
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/moviesDB?retryWrites=true&w=majority
```

> **¿Cómo obtener la URI de Atlas?**  
> MongoDB Atlas → Tu cluster → Connect → Drivers → copia la connection string.

### 3. Arranca el servidor

```bash
# Modo desarrollo (recarga automática con nodemon)
npm run dev

# Modo producción
npm start
```

Verás en consola:
```
Conectado a MongoDB
Servidor corriendo en http://localhost:3000
```

---

## Endpoints disponibles

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/movies` | Obtener todas las películas |
| GET | `/api/movies?genre=Terror` | Filtrar por género |
| GET | `/api/movies/:id` | Obtener una película por ID |
| POST | `/api/movies` | Crear una nueva película |
| PUT | `/api/movies/:id` | Actualizar una película |
| DELETE | `/api/movies/:id` | Eliminar una película |

---

## Ejemplos de uso con Postman / Insomnia

### ✅ GET — Obtener todas las películas

```
GET http://localhost:3000/api/movies
```

**Respuesta:**
```json
{
  "success": true,
  "total": 2,
  "data": [...]
}
```

---

### ✅ GET — Obtener una película por ID

```
GET http://localhost:3000/api/movies/665f1a2b3c4d5e6f7a8b9c0d
```

**Respuesta exitosa (200):**
```json

{
  "success": true,
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": "Ciencia Ficción",
    "rating": 8.8,
    "synopsis": "Un ladrón que roba secretos corporativos...",
    "duration": 148,
    "createdAt": "2024-06-01T10:00:00.000Z",
    "updatedAt": "2024-06-01T10:00:00.000Z"
  }
}
```


**Error 404:**
```json
{
  "success": false,
  "error": "Película no encontrada"
}
```

---

### ✅ POST — Crear una nueva película

```
POST http://localhost:3000/api/movies
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": "Ciencia Ficción",
  "rating": 8.8,
  "synopsis": "Un ladrón que roba secretos corporativos a través del sueño.",
  "duration": 148
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Película creada correctamente",
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Inception",
    ...
  }
}
```

**Error de validación (400):**
```json
{
  "success": false,
  "error": ["El título es obligatorio", "El director es obligatorio"]
}
```

---

### ✅ PUT — Actualizar una película

```
PUT http://localhost:3000/api/movies/665f1a2b3c4d5e6f7a8b9c0d
Content-Type: application/json
```

**Body (solo los campos a modificar):**
```json
{
  "rating": 9.1,
  "synopsis": "Sinopsis actualizada."
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Película actualizada correctamente",
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Inception",
    "rating": 9.1,
    ...
  }
}
```

---

### ✅ DELETE — Eliminar una película

```
DELETE http://localhost:3000/api/movies/665f1a2b3c4d5e6f7a8b9c0d
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Película \"Inception\" eliminada correctamente"
}
```

---

## Géneros válidos

El campo `genre` solo acepta estos valores:

`Acción` · `Comedia` · `Drama` · `Terror` · `Ciencia Ficción` · `Animación` · `Thriller` · `Romance` · `Documental` · `Otro`

---

## Control de errores

| Código | Situación |
|--------|-----------|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Datos inválidos o ID con formato incorrecto |
| 404 | Película no encontrada |
| 500 | Error interno del servidor |
