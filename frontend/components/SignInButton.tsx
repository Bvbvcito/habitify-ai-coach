// app/auth/signin/page.js
"use client";
import { signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      //Launch Google Auth
      const user = await signInWithGoogle();
      console.log("User signed in:", user);

      //Redirect User to Dashboard if logged in
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-[3rem] text-slate-800">Sign in with Google</h1>
      <button
        className="bg-green-500 text-white rounded-full px-2 py-2"
        onClick={handleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
