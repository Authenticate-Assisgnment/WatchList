import { createSlice } from "@reduxjs/toolkit";
import { User } from "./userType";

const user: User = { id: "", email: "", watchlist: [] };

const initialState = {
  user:localStorage.getItem("user") ? JSON.parse(String(localStorage.getItem("user"))) : user,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      if(!localStorage.getItem("user")){
        localStorage.setItem("user",JSON.stringify(state.user))
      }
    },
    removeUser: (state) => {
      state.user = { id: "", email: "", watchlist: [] };
    },
  },
});
export const { saveUser, removeUser } = userSlice.actions;
export default userSlice;
