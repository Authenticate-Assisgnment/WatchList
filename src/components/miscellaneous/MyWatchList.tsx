import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rootState, useMyDispatch } from "../../main";
import { removeMovie } from "../../services/movieAction";
import { setSelectedWatchlist } from "../../slices/watchlist/watchlistSlice";
import Movie from "./Movie";

const MyWatchList = () => {
  const { selectedWatchlist } = useSelector(
    (state: rootState) => state.watchlist
  );
  const { user } = useSelector((state: rootState) => state.user);
  const dispatch = useMyDispatch();
  const navigate = useNavigate();

  // Function to handle the removal of a movie from the watchlist
  const handleRemoveMovie = async (movieId: string, e: any) => {
    e.stopPropagation();
    dispatch(removeMovie(user, selectedWatchlist, movieId));
  };

  // Function to handle going back to the MovieSection
  const handleBackButton = () => {
    dispatch(setSelectedWatchlist({ id: "", title: "", movies: [] }));
    navigate("/dashboard/movies");
  };


  return (
    <div className={`md:flex ${selectedWatchlist.id !== "" ? "flex" : "hidden"}`}>
      {selectedWatchlist.movies?.length === 0 ? (
        <p>
          No movies in this watchlist. Add
          <span>
            <IoIosAdd
              onClick={() => navigate("/dashboard/movies")}
              className="text-red-600 cursor-pointer inline-block align-middle"
            />{" "}
            some movies.
          </span>
        </p>
      ) : (
        <div>
          <button onClick={handleBackButton} className="md:hidden flex bg-gray-200 px-3 mt-3 py-2 rounded-md cursor-pointer">
            {" "}
            <FaArrowLeftLong />
          </button>

          <h3 className="ml-4">{selectedWatchlist.title}</h3>
          <div className="flex flex-wrap md:gap-12 gap-2 mt-6 ml-4">
            {selectedWatchlist.movies?.map((movie) => (
              <div key={movie.imdbID} className="relative">
                <div
                  onClick={() => navigate("/dashboard/movies/" + movie.imdbID)}
                >
                  <Movie movie={movie} />
                </div>
                {/* Button or icon to remove the movie */}
                <button
                  onClick={(e) => handleRemoveMovie(movie.imdbID, e)}
                  className="absolute top-0 right-0 m-2 text-white"
                >
                  <RxCross1 className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWatchList;
