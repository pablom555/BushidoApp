"use client";

import Navbar from '../../components/Navbar';
import MovieCard from "../../components/MovieCard";
import { deleteFavoriteAll } from "../../context/actions/favorites";
import { useGlobalContext } from "../../context/store";

export default function FavoritePage() {
  const { state, dispatch } = useGlobalContext();

  return (
    <>
      <Navbar />
      <div className="container max-w-7xl mx-auto pb-32 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl mt-8 mb-5">Favorites</h1>
          <button
            className="bg-pink-400 hover:bg-pink-500 disabled:bg-slate-500 text-white min-w-24 font-bold uppercase text-xs p-2 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => deleteFavoriteAll(dispatch)}
            disabled={!state?.favorites?.length}
          >
            Remove All
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {state?.favorites && state?.favorites.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              rating={movie.popularity}
            />)
          )}
        </div>
      </div>
    </>
  );
}
