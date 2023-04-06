import { gql } from "@apollo/client";

export const GET_MOVIE_DETAIL = gql`
  query MovieDetail($id: Int!) {
    movieDetails(id: $id) {
      id
      title
      overview
      popularity
      poster_path
      backdrop_path
      release_date
      actors {
          id
          name
          character
          profilePicture
      }
    }
  }
`;

export const GET_POPULAR_MOVIES = gql`
  query PopularMovies($page : Int) {
    popularMovies(page: $page) {
      movies {
        id
        title          
        popularity
        poster_path
        release_date
      }
      totalPages
    }
  }
`;

export const SEARCH_MOVIES = gql`
  query SearchMovies($term: String!) {
    searchMovies(term: $term) {
      id
      title
      poster_path
      popularity
      release_date
    }
  }
`;
