"use client";

import ModalWindow from "@/components/ModalWindow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import { app } from "@/lib/firebase"; // Ensure the Firebase config is properly imported
import Link from "next/link";

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
  if (loading)
    return (
      <div className="w-full h-full bg-purple-700 flex items-center justify-center text-white min-h-screen">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <ModalWindow
        onClose={() => setModal(false)}
        show={modal}
        edit_method="Add"
      />
      <div className="container bg-gray-200 mx-auto h-full min-h-screen items-center justify-center flex flex-col">
        <div className="text-slate-600 text-[2rem]">
          <span className="font-normal">HOMEPAGE</span> GOES HERE
        </div>
        <div>
          <Link href="/signin">
            <button className="text-slate-700 font-normal">
              Click Here To Sign In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
