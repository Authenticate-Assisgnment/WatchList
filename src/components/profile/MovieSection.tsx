import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkPlusFill } from "react-icons/bs";

import { rootState } from "../../main";
import { setShowMovieSearch } from "../../slices/movie/movieSlice";
import MovieSectionBody from "../miscellaneous/MovieSectionBody";
import { FaArrowLeftLong } from "react-icons/fa6";
import { setSelectedWatchlist } from "../../slices/watchlist/watchlistSlice";
import { useNavigate } from "react-router-dom";

const MovieSection = () => {
  const { showMovieSearch } = useSelector((state: rootState) => state.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(setShowMovieSearch(false)); // Dispatch action to hide movie search
    };
  }, [dispatch]);

  const handleBackButton = () => {
    dispatch(setSelectedWatchlist({ id: "", title: "", movies: [] }));
    dispatch(setShowMovieSearch(false));
    navigate("/dashboard/movies");
  };
  return (
    <div
      className={`w-full p-6 md:flex flex-col ${
        showMovieSearch ? "h-full" : "h-screen"
      }`}
    >
      <button
        onClick={handleBackButton}
        className="md:hidden w-[70px] flex bg-gray-200 px-3 mt-3 py-2 rounded-md cursor-pointer"
      >
        {" "}
        <FaArrowLeftLong />
      </button>
      <div className="border-2 md:mt-0 mt-4 border-red-400 rounded-md p-4 flex flex-col gap-5 md:flex-row md:items-center">
        <h3 className="text-4xl">
          Welcome to <span className="text-red-600">Watchlists</span>
        </h3>
        <div>
          <p className="hidden md:block">
            Browse movies, add them to Watchlists and share them with friends.
          </p>
          <p className="hidden md:block">
            Just click the{" "}
            <BsBookmarkPlusFill className="inline-block align-middle" /> to add
            a movie, the poster to see more details about the movie.
          </p>
          <p className="md:hidden">
            Browse movies, add them to Watchlists, and share them with friends.
            Just click the{" "}
            <BsBookmarkPlusFill className="inline-block align-middle" /> to add
            a movie, or tap the poster to see more details.
          </p>
        </div>
      </div>
      <MovieSectionBody />
    </div>
  );
};

export default MovieSection;
