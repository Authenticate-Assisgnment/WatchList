import { Video } from "../movie/movieType";

export type WatchList={
    readonly id:string;
    title:string;
    movies?:Video[]
}