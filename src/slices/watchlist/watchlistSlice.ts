import { createSlice } from "@reduxjs/toolkit";
import { WatchList } from "./watchlistType";


const watchlists:WatchList[]=[]
const watchlist:WatchList={id:"",title:"",movies:[]}
const initialState={
    watchlists:watchlists,
    selectedWatchlist:watchlist
}
const watchlistSlice=createSlice({
    name: "watchlist",
    initialState:initialState,
    reducers:{
        saveToMyWatchlists:(state,action)=>{
            state.watchlists=action.payload
        },
        setSelectedWatchlist:(state,action)=>{
            state.selectedWatchlist=action.payload
        },
        addToWatchLists:(state,action)=>{
            state.watchlists.push(action.payload)
        }
    }
})
export const {saveToMyWatchlists,setSelectedWatchlist,addToWatchLists}=watchlistSlice.actions
export default watchlistSlice