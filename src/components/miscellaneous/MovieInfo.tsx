import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieInfo = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState({
    Actors: [],
    Director: "",
    Genre: "",
    Poster: "",
    imdbRating: "",
    Title: "",
    Writer: "",
    Plot: "",
    Year: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=${
            import.meta.env.VITE_SECRET_KEY
          }`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [imdbID]);

  const genres = movie.Genre?.split(", ") || [];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">{movie.Title}</h2>
        <p className="text-2xl text-center mb-2">{movie.Year}</p>
        <p className="text-2xl text-center mb-4">IMDb {movie.imdbRating}/10</p>
        <div className="flex justify-center mb-6">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full md:w-auto md:max-w-[800px] h-auto md:h-[500px]"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {genres.map((genre, index) => (
            <p
              key={index}
              className="border-2 border-gray-100 rounded-xl px-2 py-1"
            >
              {genre}
            </p>
          ))}
        </div>
        <h3 className="text-lg mb-6">{movie.Plot}</h3>
      </div>
    </div>
  );
};

export default MovieInfo;
