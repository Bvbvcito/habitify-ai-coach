"use client";
import { useState } from "react";
import { User } from "firebase/auth";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";

const DashBoard = () => {
  const [user, setUser] = useState<User | null>(null);

  /*
Function used to retreive user information from the ProtectedRoute middleware
*/
  const handleAuthSuccess = (user_details: User) => {
    setUser(user_details); // Store the user info in state
    console.log(user);
  };
  /*
Function used to retreive user information from the ProtectedRoute middleware
*/

  return (
    <ProtectedRoute onAuthSuccess={handleAuthSuccess}>
      <>
        <h1>User Dashboard</h1>

        <div className="flex gap-3 mt-5  w-full">
          <div className="bg-white/10 border text-white w-full border-white/15 backdrop-blur-md flex transition-all rounded-3xl bg-slate-300 h-[30rem] items-center justify-center">
            Tasks Listing Component
          </div>

          <div className="bg-white/10 border text-white w-full border-white/15 backdrop-blur-md flex transition-all rounded-3xl bg-slate-300 h-[30rem] items-center justify-center">
            Dashboard Modules
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default DashBoard;
