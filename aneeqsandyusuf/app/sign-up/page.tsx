'use client'
import  { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import Link from 'next/link';

function SignUp() {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
    
  const[createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  // State for controlled inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Update form state
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSignup = async() =>{
    try {
      const res = await createUserWithEmailAndPassword(email,password)
      console.log({res})
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">💕 Welcome to my love token 💕</h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-pink-600 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-pink-600 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
