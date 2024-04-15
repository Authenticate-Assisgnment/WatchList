import { Dispatch } from "@reduxjs/toolkit";
import { User } from "../slices/user/userType";
import { saveToMyWatchlists } from "../slices/watchlist/watchlistSlice";
import { WatchList } from "../slices/watchlist/watchlistType";
import toast from "react-hot-toast";

export const createNewWatchlist = (
  user: User,
  newWatchlist: WatchList,
  onClose: any
) => {
  return async (dispatch: Dispatch) => {
    try {
      // Fetch existing user data
      const response = await fetch(`http://localhost:3000/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const usersData = await response.json();

      // Find the user object with the specified ID
      const userToUpdate = usersData.find((us: User) => us.id === user.id);
      console.log(userToUpdate);
      if (!userToUpdate) {
        throw new Error("User not found");
      }

      // Update the watchlist property of the user object
      userToUpdate.watchlist.push(newWatchlist);

      // Send updated user data in PUT request
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

      if (!putResponse.ok) {
        throw new Error("Failed to update user with watchlist");
      }

      const data = await putResponse.json();
      toast.success("Watchlist created successfully");
      dispatch(saveToMyWatchlists(data.watchlist));
    } catch (error: any) {
      toast.error("Error updating user with watchlist:", error.message)
    }
    onClose();
  };
};
