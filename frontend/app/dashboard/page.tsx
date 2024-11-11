"use client";

import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoutes";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/"); // Redirect to sign-in page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto h-full min-h-screen items-center justify-center flex flex-col gap-5">
        <h1 className="text-slate-800 text-[3rem]">Dashboard</h1>
        {user ? (
          <p>
            Welcome, {user.displayName || "User"}! You are signed in. and your
            uid is: <span className="font-bold">{user.uid}</span>
          </p>
        ) : (
          <button className="" onClick={handleLogout}>
            Log Out
          </button>
        )}
        <span>
          {" "}
          <button
            className="bg-orange-500 rounded-full text-white px-2 py-1"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </span>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
