"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import { notFound } from 'next/navigation';

import { GetMovieDetail } from "../../../interfaces/movies";
import Navbar from "../../../components/Navbar";
import AddToFavoriteButton from "../../../components/AddToFavoriteButton";
import ThreeDotsLoader from "../../../components/ThreeDotsLoader";

import { getClient } from "../../../lib/client";
import { GET_MOVIE_DETAIL } from "../../../graphql/queries/movies";

interface MoviePageProps {
  params: {
    id: string;
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = params;
  const client = getClient();

  const { loading, error, data } = useQuery<GetMovieDetail>(GET_MOVIE_DETAIL, {
    client,
    variables: {
      id: Number(id)
    }
  });

  if (loading) {
    return (<ThreeDotsLoader />)
  }

  if (error) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto pt-6 pb-32">
        <div className="px-10">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${data?.movieDetails.backdrop_path}`}
            width={1000}
            height={600}
            className="rounded-md"
            alt={data?.movieDetails.title!}
            priority
          />
          <div className="flex items-center justify-between pr-2">
            <div className="flex items-center gap-5">
              <h1 className="font-bold text-xl my-4 text-pink-500">{data?.movieDetails?.title}</h1>
              <AddToFavoriteButton
                id={id}
                title={data?.movieDetails?.title!}
                popularity={data?.movieDetails.popularity!}
                poster_path={data?.movieDetails.poster_path!}
                release_date={data?.movieDetails.release_date!}
              />
            </div>
            <p className="text-cyan-300 text-sm">Rating: <span className="text-gray-100">{data?.movieDetails.popularity}</span></p>
          </div>

          <p className="text-gray-300 text-sm mt-4">{data?.movieDetails.overview}</p>
          <p className="mt-5 text-cyan-300 text-sm">
            Actors: <span className="font-bold text-gray-400 ">{data?.movieDetails.actors.map((actor: { name: any; }) => actor.name).join(', ')}</span>
          </p>
          <p className="text-cyan-300 text-sm mt-4">Release Date: <span className="font-bold text-gray-400">{data?.movieDetails.release_date}</span></p>
        </div>
      </div>
    </>
  )
}
