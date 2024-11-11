// components/ProtectedRoute.js
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
    <div className="flex w-full min-h-screen mx-auto items-center justify-center">
      <p>Loading Please Wait ...</p>
    </div>;
  }

  return user ? children : null;
};

export default ProtectedRoute;
