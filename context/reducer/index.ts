import { MovieFavorite } from "../../interfaces/movies";

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const newFavorites = [...state.favorites, action.data];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return {
        ...state,
        favorites: newFavorites,
      };
    }
    case "DELETE_FAVORITE": {
      const newFavorites = state.favorites.filter((item: MovieFavorite) =>
        item.id !== action.data.id
      );
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return {
        ...state,
        favorites: newFavorites
      };
    }
    case "DELETE_FAVORITE_ALL": {
      localStorage.removeItem('favorites');

      return {
        ...state,
        favorites: [],
      };
    }
       
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { storeReducer };
