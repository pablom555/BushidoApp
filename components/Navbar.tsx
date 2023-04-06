"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Cookies from 'universal-cookie';

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Favorites',
  route: '/favorites'
}];

export default function Navigation() {
  const router = useRouter();

  const logoutHandler = () => {
    const cookie = new Cookies();
    cookie.remove('bushidoToken');
    router.push('/login');
  }

  return (
    <nav className="bg-zinc-800 mb-5">
      <div className="font-bold text-neutral-100 py-4 px-8 max-w-7xl mx-auto container tracking-widest font-neue flex flex-col sm:flex-row justify-between items-center gap-10">
        <Link href="/">
          <p className="text-lg md:text-2xl">Watch
            <span className="text-pink-500">Me</span>
          </p>
        </Link>
        <div className="flex w-full justify-between items-center gap-8">
          <ul className="flex gap-3 text-sm">
            {links.map(({ label, route }) => (
              <li key={route}>
                <Link href={route} className="hover:text-pink-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={logoutHandler}
              className="w-full text-white bg-zinc-800 hover:text-pink-500 focus:outline-none font-medium rounded-lg text-sm  py-2.5 text-center "
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
};
