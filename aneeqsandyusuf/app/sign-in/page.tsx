"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const allowedEmails = [
    "ceresyusuf@gmail.com",
    "aneeqahabdol@gmail.com",
  ];
  const allowedPassword = "Yusuf14022001";

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission
    if (!allowedEmails.includes(email)) {
      alert("Only specific users can sign in.");
      return;
    }
    if (password !== allowedPassword) {
      alert("Incorrect password.");
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      // Set cookie for auth and email
      setCookie('firebaseAuthToken', 'true');
      setCookie('userEmail', email);
      // Clear fields after sign in
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Sign in failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          ❤️ Sign In ❤️
        </h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label
              className="block text-pink-600 font-medium mb-2"
              htmlFor="email"
            >
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
            <label
              className="block text-pink-600 font-medium mb-2"
              htmlFor="password"
            >
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
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-pink-600">
          Only pre-approved users can sign in.
        </p>
      </div>
    </div>
  );
}

export default SignIn;
