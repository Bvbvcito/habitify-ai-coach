"use client";

import ModalWindow from "@/components/ModalWindow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import { app } from "@/lib/firebase"; // Ensure the Firebase config is properly imported
import SignInPage from "@/components/SignInButton";

export default function HomePage() {
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const auth: Auth = getAuth(app);

  useEffect(() => {
    // Check if we're running on the client-side
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Redirect to dashboard if the user is authenticated
          router.push("/dashboard");
        } else {
          // Stop loading if the user is not authenticated
          setLoading(false);
        }
      });

      // Clean up the listener on component unmount
      return () => unsubscribe();
    }
  }, [auth, router]);

  // Optionally show a loading indicator while checking auth state
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ModalWindow
        onClose={() => setModal(false)}
        show={modal}
        edit_method="Add"
      />
      <div className="container bg-gray-200 mx-auto h-full min-h-screen items-center justify-center flex flex-col">
        <div className="text-slate-600 text-[2rem]">HOMEPAGE</div>
        <div>
          <button
            onClick={() => setModal(true)}
            className="bg-orange-500 text-white rounded-full p-2"
          >
            Open Modal
          </button>
          <SignInPage />
        </div>
      </div>
    </>
  );
}
