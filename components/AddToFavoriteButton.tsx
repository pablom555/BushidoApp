"use client";

import { addFavorite, deleteFavorite } from "../context/actions/favorites";
import { useGlobalContext } from "../context/store";
import { MovieFavorite } from "../interfaces/movies";

interface MovieFavoriteProps extends MovieFavorite { }

const AddToFavoriteButton = ({ id, title, popularity, poster_path, release_date }: MovieFavoriteProps) => {
  const { state, dispatch } = useGlobalContext();

  const isFavorite = !!state?.favorites?.find((item: MovieFavorite) => item.id == id);

  const onClickFavoriteHandle = () => {
    if (isFavorite) {
      deleteFavorite(dispatch, id);
    } else {
      addFavorite(dispatch, {
        id,
        title,
        popularity,
        poster_path,
        release_date
      })
    }
  }

  return (
    <button
      className={`${isFavorite ? 'bg-pink-500' : 'bg-gray-400'} text-white font-bold uppercase text-xs w-8 h-8 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150`}
      type="button"
      onClick={onClickFavoriteHandle}
    >
      🤍
    </button>
  )
}

export default AddToFavoriteButton;
