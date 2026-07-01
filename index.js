const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const movieRoutes = require("./src/routes/movie.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(express.json()); // Parsear el body de las peticiones como JSON

// ── Rutas ────────────────────────────────────────────────────
app.use("/api/movies", movieRoutes);

// Ruta raíz de comprobación
app.get("/", (req, res) => {
  res.json({ message: "API Movies funcionando correctamente 🎬" });
});

// ── Manejo de rutas no encontradas (404) ─────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── Manejo global de errores ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ── Conexión a MongoDB y arranque del servidor ────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });
