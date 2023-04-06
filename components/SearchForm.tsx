
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useLazyQuery } from "@apollo/client";

import ThreeDotsLoader from "./ThreeDotsLoader";
import { MovieFavorite } from "../interfaces/movies";

import { getClient } from "../lib/client";
import { SEARCH_MOVIES } from "../graphql/queries/movies";
import useDebounce from '../hooks/useDebounce';

interface SearchFormProps {
  onSearchMovie: Dispatch<SetStateAction<MovieFavorite[] | null>>
}

function SearchForm({ onSearchMovie }: SearchFormProps) {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceSearch = useDebounce(searchQuery, 500);

  const client = getClient();
  const [searchMovie, { loading, error, data }] = useLazyQuery(SEARCH_MOVIES, { client, fetchPolicy: "no-cache", });

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (typeof searchQuery !== "string") {
      return;
    }
  };

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (debounceSearch) {
      searchMovie({
        variables: {
          term: debounceSearch
        }
      })
    } else {
      onSearchMovie(null)
    }

  }, [debounceSearch, searchMovie, onSearchMovie])

  useEffect(()=> {
    if (!loading && debounceSearch) {
      onSearchMovie(data?.searchMovies)
    }
  }, [loading, data, onSearchMovie, debounceSearch]);

  return (
    <div className="w-4/5 sm:w-2/3">
      <form onSubmit={onSearch}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input
            type="search"
            value={searchQuery || ""}
            onChange={onChangeHandle}
            className="w-full pl-10 px-3 py-2 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-zinc-700 rounded-xl focus:outline-none focus:ring-[1px] focus:ring-pink-500 placeholder:text-zinc-400"
            placeholder="What are you looking for?"
          />
        </div>
      </form>
      {loading && <ThreeDotsLoader />}
    </div>
  )
}

export default SearchForm;
