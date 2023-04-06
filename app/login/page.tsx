"use client";

import React, { useState} from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios';

import { BACKEND_API_URI } from '../../constants';
import Cookies from 'universal-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const loginResponse = await axios.post(`${BACKEND_API_URI}/auth/login`, {email, password });
      const cookie = new Cookies();
      cookie.set('bushidoToken', loginResponse?.data?.token, {path: '/'}); 

      if (loginResponse.status === 200) {    
        router.push('/');
      }      

    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data)
    }

  }

  return (
    <div className="flex justify-center mt-36">
      <div className="w-10/12 bg-zinc-800 rounded-lg shadow sm:max-w-md">
        <div className="space-y-6 p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-pink-400 md:text-2xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="bg-zinc-600 border border-zinc-700 text-white rounded-lg focus:outline-none focus:ring-[1px] focus:ring-pink-400 block w-full p-2.5" 
                placeholder="name@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="••••••••" 
                className="bg-zinc-600 border border-zinc-700 text-white rounded-lg focus:outline-none focus:ring-[1px] focus:ring-pink-400 block w-full p-2.5" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="w-full text-white bg-zinc-800 hover:text-pink-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
            {
              error && (
                <p className="w-full text-center text-pink-500">{error}</p>
              )
            }
          </form>
        </div>
      </div>
    </div>

  )
}

export default LoginPage;
