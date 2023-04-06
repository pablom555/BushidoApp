
"use client";

import { createContext, useContext, Dispatch, useReducer, useEffect } from 'react';
import { storeReducer } from "./reducer";
import { MovieFavorite } from '../interfaces/movies';
import { addFavorite, deleteFavoriteAll } from './actions/favorites';
type Props = {
  children: React.ReactNode
}

interface ContextProps {
  state?: {
    favorites: [MovieFavorite];
  },
  dispatch?: Dispatch<any>,
}

const initialState = {
  favorites: [],
};

const GlobalContext = createContext<ContextProps>({})

export const GlobalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.length) {
      deleteFavoriteAll(dispatch);
      favorites.map((item: MovieFavorite) => addFavorite(dispatch, item))
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);

