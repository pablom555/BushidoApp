import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center my-40">
      <h1 className="font-bold text-pink-500 text-9xl">404</h1>
      <h6 className="text-5xl font-bold text-gray-600">
        <span className="text-cyan-500">Oops!</span> Page not found
      </h6>
      <p className="text-gray-500 mt-3">{" The page you're looking for dosen't exist."}</p>
      <Link href="/">
        <p className="bg-cyan-200 text-pink-400 mt-5 font-semibold px-6 py-2 text-sm rounded-md">Go home</p>
      </Link>
    </div>
  );
};

export default NotFound;