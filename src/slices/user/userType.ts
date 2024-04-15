
import { WatchList } from "../watchlist/watchlistType";

export type User={
    readonly id:string;
    email:string;
    watchlist?:WatchList[]

}

