import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rootState, useMyDispatch } from "../../main";
import { getSearchMovies } from "../../services/movieAction";
import { saveMovies, setSelctedVideo } from "../../slices/movie/movieSlice";
import { Video } from "../../slices/movie/movieType";
import Movie from "./Movie";
import SelectWatchListModal from "./SelectWatchListModal";

const MovieSectionBody = () => {
  const [search, setSearch] = useState("");
  const [bookmarkClicked, setBookMarkClicked] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { movieLoading, movies } = useSelector(
    (state: rootState) => state.video
  );
  const navigate = useNavigate();
  const dispatch = useMyDispatch();

  async function fetchMovies() {
    dispatch(getSearchMovies(search));
  }

  useEffect(() => {
    if (search.length > 2) {
      fetchMovies();
    }
  }, [search]);
  useEffect(() => {
    search.length == 0 && dispatch(saveMovies([]));
  }, [search]);

  const handleMovieClick = (movie: Video) => {
    navigate("/dashboard/movies/" + movie.imdbID);
  };

  const handleBookmarkClick = (movie: Video, e: any) => {
    e.stopPropagation();
    dispatch(setSelctedVideo({ ...movie, bookmarked: true }));
    setBookMarkClicked(!bookmarkClicked);
    console.log(movie);
  };

  useEffect(() => {
    if (bookmarkClicked) {
      onOpen();
    }
  }, [bookmarkClicked, onOpen]);

  const handleModalClose = () => {
    setBookMarkClicked(false);
    onClose();
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row">
        <div className="relative flex-1 md:w-3/4">
          <input
            className="w-full rounded-md p-1 border-2 md:text-base text-sm border-gray-300 md:border-r-0 outline-none pl-6"
            type="text"
            placeholder="Enter the name of the movie here"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoIosSearch className="absolute top-2.5 left-1" />
        </div>
        <button onClick={()=>fetchMovies()} className="bg-red-600 md:px-2 py-1 text-white rounded-md w-full md:w-auto mt-4 md:mt-0 md:ml-2">
          Search
        </button>
      </div>
      <div className="flex flex-wrap md:gap-6 gap-4 mt-6">
        {movieLoading ? (
          <div className="h-full w-full">
            <Spinner />
          </div>
        ) : (
          movies?.map((movie) => (
            <div
              key={movie.imdbID}
              className="relative w-[190px] md:w-[230px] md:ml-6"
              onClick={() => handleMovieClick(movie)}
            >
              <Movie movie={movie} />
              <BsBookmarkPlusFill
                onClick={(e) => handleBookmarkClick(movie, e)}
                className="absolute top-0 h-6 w-6 z-30 cursor-pointer"
              />
            </div>
          ))
        )}
      </div>
      <SelectWatchListModal isOpen={isOpen} onClose={handleModalClose} />
    </div>
  );
};

export default MovieSectionBody;
