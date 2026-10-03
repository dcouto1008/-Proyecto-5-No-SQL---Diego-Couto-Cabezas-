const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  getMoviesByTitle,
  getMoviesByYear,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

// GET    /api/movies          → Obtener todas las películas
// GET    /api/movies/title/:title → Buscar películas por título
// GET    /api/movies/year/:year   → Películas posteriores a un año
// GET    /api/movies/:id      → Obtener una película por ID
// POST   /api/movies          → Crear una nueva película
// PUT    /api/movies/:id      → Modificar una película
// DELETE /api/movies/:id      → Eliminar una película

router.get("/", getAllMovies);
// Las rutas específicas van ANTES de "/:id" para que no se confundan con un id
router.get("/title/:title", getMoviesByTitle);
router.get("/year/:year", getMoviesByYear);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
