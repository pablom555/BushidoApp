import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
  rating: number;
}

const MovieCard = ({ id, title, poster_path, release_date, rating }: MovieCardProps) => {
  return (
    <Link href="/movies/[id]" as={`/movies/${id}`} className="">
      <div className="bg-white text-gray-700 shadow-sm rounded-md cursor-pointer hover:ring-[1px] hover:ring-cyan-400 hover: hover:bg-zinc-700 hover:text-gray-50">
        <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} width={600} height={700} className="rounded-t-md" alt={title} priority/>
        <div className="px-6 py-2">
          <div className="font-bold text-xl h-16 mb-1">{title}</div>
          <p className="text-base mb-1"><span className="font-bold">Release Date</span> {release_date}</p>
          <p className="text-base mb-1"><span className="font-bold">Rating</span> {rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;