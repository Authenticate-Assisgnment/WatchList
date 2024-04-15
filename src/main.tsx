import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice.ts";
import { Provider, useDispatch } from "react-redux";
import movieSlice from "./slices/movie/movieSlice.ts";
import watchlistSlice from "./slices/watchlist/watchlistSlice.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [movieSlice.name]: movieSlice.reducer,
    [watchlistSlice.name]: watchlistSlice.reducer,
  },
});
export type rootState = ReturnType<typeof store.getState>;
export const useMyDispatch: () => typeof store.dispatch = useDispatch;

const container = document.getElementById("root");
let root;
if (!(container as any)._reactRootContainer) {
  root = ReactDOM.createRoot(container!);
} else {
  root = ReactDOM.createRoot((container as any)._reactRootContainer);
}
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <Toaster/>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
