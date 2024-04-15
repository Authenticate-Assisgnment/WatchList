import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";
import { rootState, useMyDispatch } from "../main";
import {
  saveToMyWatchlists,
  setSelectedWatchlist,
} from "../slices/watchlist/watchlistSlice";

const Dashboard = () => {
  const { user } = useSelector((state: rootState) => state.user);
  const dispatch = useMyDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(saveToMyWatchlists(user.watchlist));
  }, []);
  useEffect(() => {
    // Update React state to match the URL
    if (location.pathname === "/dashboard/movies") {
      dispatch(setSelectedWatchlist({ id: "", title: "", movies: [] }));
    }
  }, [dispatch, location.pathname]);

  return (
    <div className="flex flex-col md:flex-row relative h-screen">
      <Sidebar />
      <div className="w-full md:w-11/12 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
