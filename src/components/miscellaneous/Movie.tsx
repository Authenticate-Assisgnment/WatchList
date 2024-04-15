import {Video } from "../../slices/movie/movieType"

type PropType={
  movie:Video 
}
const Movie = ({movie}:PropType) => {
  return (
    <div className="md:h-[320px] mb-2- h-[160px] transition-transform transform-gpu hover:scale-110 rounded-md md:w-[200px] w-full border-1 border-gray-500 shadow-md p-2 cursor-pointer">
      <img className="h-2/3 w-full object-cover" src={movie.Poster} alt="" />
      <p className="mt-4 font-semibold md:text-base text-xs">{movie.Title}</p>
      <p className="text-gray-500 md:text-sm text-[8px]">({movie.Year})</p>
    </div>
  )
}

export default Movie