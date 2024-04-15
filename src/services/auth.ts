import { Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { saveUser } from "../slices/user/userSlice";
import { User } from "../slices/user/userType";

export const login = (email: string, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      const foundEmailData = data?.find((user: User) => user.email === email);
      console.log(foundEmailData);
      if(foundEmailData) {
        toast.success("User logged in successfully")
        dispatch(saveUser(foundEmailData));
        navigate("/dashboard/movies");
      }
    } catch (error) {
      toast.error("User does not exist")
    }
  };
};
export const signup = async (email: string, navigate: NavigateFunction,setEmail:React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, watchlist: [] }),
    });
    console.log(response)
    if (response.ok) {
      toast.success("Successfully signed up")
      setEmail("")
      navigate("/");
    }
  } catch (error: any) {
    toast.error("Something went wrong")
  }
};
