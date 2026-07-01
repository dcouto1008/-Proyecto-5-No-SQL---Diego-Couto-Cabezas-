const mongoose = require("mongoose");

// ── Schema de Movie ───────────────────────────────────────────
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "El director es obligatorio"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "El año es obligatorio"],
      min: [1888, "El año mínimo es 1888"],
      max: [new Date().getFullYear() + 5, "El año no puede ser tan futuro"],
    },
    genre: {
      type: String,
      required: [true, "El género es obligatorio"],
      enum: {
        values: ["Acción", "Comedia", "Drama", "Terror", "Ciencia Ficción", "Animación", "Thriller", "Romance", "Documental", "Otro"],
        message: "{VALUE} no es un género válido",
      },
    },
    rating: {
      type: Number,
      min: [0, "La valoración mínima es 0"],
      max: [10, "La valoración máxima es 10"],
      default: 0,
    },
    synopsis: {
      type: String,
      trim: true,
      default: "",
    },
    duration: {
      type: Number, // duración en minutos
      min: [1, "La duración mínima es 1 minuto"],
    },
  },
  {
    timestamps: true, // añade createdAt y updatedAt automáticamente
    versionKey: false,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
