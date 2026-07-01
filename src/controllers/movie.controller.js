const Movie = require("../models/movie.model");

// ── GET /api/movies ──────────────────────────────────────────
// Obtiene todas las películas. Permite filtrar por género con ?genre=Terror
const getAllMovies = async (req, res) => {
  try {
    const filter = {};

    // Si se pasa ?genre=... en la query, filtramos por género
    if (req.query.genre) {
      filter.genre = req.query.genre;
    }

    const movies = await Movie.find(filter).sort({ year: -1 });
    res.status(200).json({
      success: true,
      total: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ── GET /api/movies/:id ──────────────────────────────────────
// Obtiene una película por su ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: "Película no encontrada" });
    }

    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    // Si el id no tiene formato válido de MongoDB, mongoose lanza CastError
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, error: "ID no válido" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// ── POST /api/movies ─────────────────────────────────────────
// Crea una nueva película
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();

    res.status(201).json({
      success: true,
      message: "Película creada correctamente",
      data: savedMovie,
    });
  } catch (error) {
    // ValidationError de Mongoose: campos requeridos o enum inválido
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// ── PUT /api/movies/:id ──────────────────────────────────────
// Modifica una película existente por su ID
const updateMovie = async (req, res) => {
  try {
    // runValidators: true para que Mongoose valide también en el update
    // new: true para devolver el documento ya actualizado
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ success: false, error: "Película no encontrada" });
    }

    res.status(200).json({
      success: true,
      message: "Película actualizada correctamente",
      data: movie,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, error: "ID no válido" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// ── DELETE /api/movies/:id ───────────────────────────────────
// Elimina una película por su ID
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: "Película no encontrada" });
    }

    res.status(200).json({
      success: true,
      message: `Película "${movie.title}" eliminada correctamente`,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, error: "ID no válido" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
