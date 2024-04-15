import { Dispatch } from "@reduxjs/toolkit";
import { Video } from "../slices/movie/movieType";
import { saveUser } from "../slices/user/userSlice";
import { User } from "../slices/user/userType";
import toast from "react-hot-toast";
import {
  saveToMyWatchlists,
  setSelectedWatchlist,
} from "../slices/watchlist/watchlistSlice";
import { WatchList } from "../slices/watchlist/watchlistType";
import { setMovieLoading, saveMovies } from "../slices/movie/movieSlice";

export const addToSelectedWatchlist = (
  user: User,
  selectedValue: string,
  selectedVideo: Video,
  onClose: any
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const usersData = await response.json();

      // Find the user object with the specified ID
      const userToUpdate = usersData.find((us: User) => us.id === user.id);
      const listToUpdate = userToUpdate.watchlist?.find(
        (list: any) => list.id === selectedValue
      );
      console.log(listToUpdate);
      if (!listToUpdate) {
        throw new Error("list not found");
      }
      let selectedMovieFound = listToUpdate.movies.find(
        (movie: Video) => movie.imdbID === selectedVideo.imdbID
      );
      if (selectedMovieFound) {
        console.log("Movie already present in your watchlist");
        onClose();
        return;
      }
      // Update the watchlist property of the user object
      listToUpdate.movies?.push(selectedVideo);
      userToUpdate.watchlist?.map((list: WatchList) =>
        list.id === listToUpdate.id ? listToUpdate : list
      );

      //   Send updated user data in PUT request
      const putResponse = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToUpdate),
        }
      );

      const data = await putResponse.json();
      toast.success("Movie added to watchlist successfully")
      dispatch(saveUser(data));
      dispatch(saveToMyWatchlists(data.watchlist));
    } catch (error: any) {
      console.error("Error updating user with watchlist:", error.message);
      toast.error(error.message)
    }
    onClose();
  };
};

export const removeMovie = (
  user: User,
  selectedWatchlist: WatchList,
  movieId: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const usersData = await response.json();

      // Find the user object with the specified ID
      let userToUpdate = usersData.find((us: User) => us.id === user.id);
      let listToUpdate = userToUpdate.watchlist?.find(
        (list: any) => list.id === selectedWatchlist.id
      );
      console.log(listToUpdate);
      if (!listToUpdate) {
        throw new Error("list not found");
      }
      listToUpdate.movies = listToUpdate.movies.filter(
        (movie: Video) => movie.imdbID !== movieId
      );
      userToUpdate.watchlist = userToUpdate.watchlist?.map((list: WatchList) =>
        list.id === selectedWatchlist.id ? listToUpdate : list
      );
      const putResponse = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToUpdate),
        }
      );
      const data = await putResponse.json();
      toast.success("Movie removed successfully")
      dispatch(saveUser(data));
      dispatch(saveToMyWatchlists(data.watchlist));
      dispatch(setSelectedWatchlist(listToUpdate));
    } catch (error: any) {
      toast.error("Error updating user with watchlist:", error.message)
    }
  };
};
export const getSearchMovies = (search:string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setMovieLoading());
      const response = await fetch(
        `https://omdbapi.com/?s=${search}&apikey=${
          import.meta.env.VITE_SECRET_KEY
        }`
      );
      const data = await response.json();
      if (data.Response === "True") {
        let movies = data.Search;
        movies = movies.filter((movie: Video) => movie.Poster !== "N/A");
        dispatch(saveMovies(movies));
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      dispatch(setMovieLoading());
    }
  };
};
