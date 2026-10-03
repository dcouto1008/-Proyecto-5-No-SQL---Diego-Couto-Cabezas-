require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../src/models/movie.model");

const movies = [
  { title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Ciencia Ficción", rating: 8.8, synopsis: "Un ladrón que roba secretos corporativos a través del sueño.", duration: 148 },
  { title: "Interstellar", director: "Christopher Nolan", year: 2014, genre: "Ciencia Ficción", rating: 8.6, synopsis: "Un grupo de astronautas viaja a través de un agujero de gusano.", duration: 169 },
  { title: "El Padrino", director: "Francis Ford Coppola", year: 1972, genre: "Drama", rating: 9.2, synopsis: "La saga de la familia mafiosa Corleone.", duration: 175 },
  { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, genre: "Thriller", rating: 8.9, synopsis: "Historias entrelazadas de criminales en Los Ángeles.", duration: 154 },
  { title: "Toy Story", director: "John Lasseter", year: 1995, genre: "Animación", rating: 8.3, synopsis: "Los juguetes de Andy cobran vida cuando nadie mira.", duration: 81 },
  { title: "El Resplandor", director: "Stanley Kubrick", year: 1980, genre: "Terror", rating: 8.4, synopsis: "Un escritor y su familia pasan el invierno en un hotel aislado.", duration: 146 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    await Movie.deleteMany();
    console.log("🗑️  Colección vaciada");

    await Movie.insertMany(movies);
    console.log(`🌱 ${movies.length} películas insertadas correctamente`);
  } catch (error) {
    console.error("❌ Error en la semilla:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Desconectado");
  }
};

seed();
