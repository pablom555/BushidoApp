import MovieCard from "../components/MovieCard";
import { MovieFavorite } from '../interfaces/movies';

const FoundMoviesContainer = ({ movies} : {movies: MovieFavorite[]}) => {
  return (
    <>
      <div className="container max-w-7xl mx-auto pb-12 px-8">
        <h1 className="text-white text-2xl mt-8 mb-5">Search Movie</h1>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies?.map((movie: any) => (
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
  )
}

export default FoundMoviesContainer
