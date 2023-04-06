import { MovieFavorite } from "../../interfaces/movies";

const addFavorite = async (dispatch: any, favoriteData: MovieFavorite) => {
  dispatch({ type: "ADD_FAVORITE" , data: favoriteData});
};

const deleteFavorite = async (dispatch: any, id: string) => {
  dispatch({ type: "DELETE_FAVORITE" , data: { id } });
};

const deleteFavoriteAll = async (dispatch: any) => {
  dispatch({ type: "DELETE_FAVORITE_ALL" });
};

export { addFavorite, deleteFavorite, deleteFavoriteAll };