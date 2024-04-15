import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/authentication/PrivateRoute";
import MovieInfo from "./components/miscellaneous/MovieInfo";
import Dashboard from "./pages/Dashboard";
import MovieSection from "./components/profile/MovieSection";
import MyWatchList from "./components/miscellaneous/MyWatchList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard/movies" element={<MovieSection />} />
        <Route path="/dashboard/watchlist/:id" element={<MyWatchList />} />
        <Route />
      </Route>
      <Route
        path="/dashboard/movies/:imdbID"
        element={
          <PrivateRoute>
            <MovieInfo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
