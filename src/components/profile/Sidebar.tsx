import { useDisclosure } from "@chakra-ui/react";
import { BiMovie } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { rootState } from "../../main";
import { setSelectedWatchlist } from "../../slices/watchlist/watchlistSlice";
import { WatchList } from "../../slices/watchlist/watchlistType";
import WatchListModal from "../miscellaneous/WatchListModal";
import { useState } from "react";
import { setShowMovieSearch } from "../../slices/movie/movieSlice";
const Sidebar = () => {
  const { watchlists ,selectedWatchlist} = useSelector((state: rootState) => state.watchlist);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { showMovieSearch } = useSelector(
    (state: rootState) => state.video
  );
  const { user } = useSelector((state: rootState) => state.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location =useLocation()
  const handleClick = (watchlist: WatchList) => {
    dispatch(setSelectedWatchlist(watchlist));
    navigate("/dashboard/watchlist/" + watchlist.id);
  };
  const handleHomeClick = () => {
    dispatch(setSelectedWatchlist({ id: "", title: "", movies: [] }));
    navigate("/dashboard/movies");
  };
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Function to close the logout modal
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    closeLogoutModal(); // Close the logout modal
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleButtonClick=()=>{
    dispatch(setShowMovieSearch(true))
  }
  const renderSidebar = location.pathname === "/dashboard/movies" && !showMovieSearch
  return (
    <div
      className={`${
        renderSidebar? "flex flex-col" : "hidden"
      } md:w-[25%] border-2 border-r-gray-200 border-t-0 p-4 h-[100vh] md:flex md:flex-col`}
    >
      <div>
        <h3 className="text-4xl font-bold text-red-600 text-center">
          Watchlists
        </h3>
        <div
          onClick={handleHomeClick}
          className="flex cursor-pointer gap-3 bg-red-600 items-center p-2 rounded-md mt-8"
        >
          <IoHomeOutline />
          <p className="text-white">Home</p>
        </div>
        <div className="bg-gray-300 mt-5 h-0.5" />
        <div className="mt-4 flex justify-between">
          <h4 className="text-xl font-medium">My Lists</h4>
          <button onClick={handleButtonClick} className="bg-red-600 px-2 py-1 rounded-md md:hidden flex text-white">Search</button>
        </div>

        <button
          onClick={onOpen}
          className="flex gap-2 items-center bg-gray-200 px-2 py-1 rounded-md mt-4"
        >
          <FaPlus />
          <p>New List</p>
        </button>
        <WatchListModal onClose={onClose} isOpen={isOpen} />
        <div className="mt-4 overflow-scroll h-[250px]">
          {watchlists.length == 0 ? (
            <div>
              <p>No watchlist</p>
            </div>
          ) : (
            watchlists.map((watchlist) => (
              <div
                onClick={() => handleClick(watchlist)}
                key={watchlist.id}
                className={`${
                  selectedWatchlist?.id === watchlist.id ? "bg-gray-300" : ""
                } flex cursor-pointer hover:bg-gray-300 duration-200 items-center gap-3 border-2 mb-2 rounded-md border-gray-200 px-2 py-1`}
              >
                <BiMovie />
                <p>{watchlist.title}</p>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between items-center mt-4 border-2 px-2 py-1">
          <p className="border-gray-200  rounded-md">{user.email}</p>
          <p onClick={openLogoutModal} className="cursor-pointer">
            .....
          </p>
        </div>
      </div>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-bold mb-4">Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="text-blue-500 px-4 py-2 rounded-md"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
