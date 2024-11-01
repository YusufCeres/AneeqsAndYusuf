'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter(); // This should work correctly now

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail('');
      setPassword('');
      router.push('/sign-in'); // Use router.push to navigate after successful sign up
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">💕 Welcome to my love token 💕</h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-pink-600 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-pink-600 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white p-3 rounded-md hover:bg-pink-600 transition-colors font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-pink-600">
          Already have an account? <Link href="/sign-in" className="underline text-pink-800">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
