// app/auth/signin/page.js
"use client";
import { signInWithGoogle } from "@/lib/auth";

const SignInPage = () => {
  return (
    <div>
      <h1 className="text-[3rem] text-slate-800">Sign in with Google</h1>
      <button
        className="bg-green-500 text-white rounded-full px-2 py-2"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
