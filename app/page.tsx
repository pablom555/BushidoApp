"use client";

import { useState } from 'react';

import Navbar from '../components/Navbar';
import SearchForm from "../components/SearchForm";
import FavoritesContainer from '../components/FavoritesContainer';
import { MovieFavorite } from '../interfaces/movies';
import FoundMoviesContainer from '../components/FoundMoviesContainer';

export default function HomePage() {
  const [foundMovies, setFoundMovies] = useState<MovieFavorite[] | null>(null);

  return (
    <>
      <Navbar />
      
      <div className="flex flex-col items-center">

        <SearchForm onSearchMovie={setFoundMovies} />

        {foundMovies ? (
          <FoundMoviesContainer movies={foundMovies} />
        ) : (
          <FavoritesContainer />
        )}

      </div>
    </>

  );
}
