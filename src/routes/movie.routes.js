const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

// GET    /api/movies          → Obtener todas las películas
// GET    /api/movies/:id      → Obtener una película por ID
// POST   /api/movies          → Crear una nueva película
// PUT    /api/movies/:id      → Modificar una película
// DELETE /api/movies/:id      → Eliminar una película

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
