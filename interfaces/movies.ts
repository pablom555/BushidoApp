export interface GetMovieDetail {
  movieDetails: MovieDetails;
}

export interface MovieDetails {
  id:            number;
  overview:      string;
  popularity:    number;
  title:         string;
  poster_path:   string;
  backdrop_path: string;
  release_date:  string;
  actors:        Actor[];
}

export interface Actor {
  id:             string;
  name:           string;
  character:      string;
  profilePicture: string;
}

export interface MovieFavorite {
  id:            string;
  title:         string;
  popularity:    number;
  poster_path:   string;
  release_date:  string;
}