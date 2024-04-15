import { createSlice } from "@reduxjs/toolkit";
import { Video } from "./movieType";

const movies:Video[]=[]
const selectedVideo:Video={imdbID:"",Poster:"",Title:"",Type:"",Year:"",bookmarked:false}
const initialState={
    movies:movies,
    movieLoading:false,
    selectedVideo:selectedVideo,
    showMovieSearch:false
}
const movieSlice=createSlice({
    name: "video",
    initialState:initialState,
    reducers:{
       saveMovies:(state,action)=>{
         state.movies=action.payload
       },
       setMovieLoading:(state)=>{
        state.movieLoading=!state.movieLoading
       },
       setSelctedVideo:(state,action)=>{
        state.selectedVideo=action.payload
       },
       setShowMovieSearch:(state,action)=>{
         state.showMovieSearch=action.payload
       }
    }
})
export const {saveMovies,setMovieLoading,setSelctedVideo,setShowMovieSearch}=movieSlice.actions
export default movieSlice