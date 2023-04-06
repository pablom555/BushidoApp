
"use client";

import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";

import MovieCard from "../components/MovieCard";
import Paginator from "../components/Paginator";
import ThreeDotsLoader from './ThreeDotsLoader';

import { getClient } from "../lib/client";
import { GET_POPULAR_MOVIES } from '../graphql/queries/movies';

const FavoritesContainer = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const client = getClient();
  const [getPopularMovies, { loading, error, data }] = useLazyQuery(GET_POPULAR_MOVIES, { client, fetchPolicy: "no-cache", });

  useEffect(() => {
    getPopularMovies({
      variables: {
        page: pageIndex
      }
    })
  }, [pageIndex, getPopularMovies])

  if (loading) {
    return (<ThreeDotsLoader />)
  }
  
  return (
    <>
      <div className="container max-w-7xl mx-auto pb-12 px-8">
        <h1 className="text-white text-2xl mt-8 mb-5">Popular</h1>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.popularMovies?.movies?.map((movie: any) => (
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
      <div className="flex gap-3 flex-wrap p-6 pb-28">
        {data?.popularMovies?.totalPages > 0 && (
          <Paginator
            gotoPage={setPageIndex}
            canPreviousPage={pageIndex > 1}
            canNextPage={pageIndex < data?.popularMovies?.totalPages - 1}
            pageCount={data?.popularMovies?.totalPages}
            pageIndex={pageIndex}
          />
        )}
      </div>
    </>
  )
}

export default FavoritesContainer
