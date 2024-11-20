"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import ListHabits from "@/components/habits/ListHabits";
import HabitsModal from "@/components/habits/HabitsModal";

const DashBoard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [habitsModal, setHabitsModal] = useState(false);
  /**
   * Function to retrieve user information from the ProtectedRoute middleware
   */
  const handleAuthSuccess = (user_details: User) => {
    setUser(user_details); // Store the user info in state
  };

  useEffect(() => {
    if (habitsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [habitsModal]);

  return (
    <ProtectedRoute onAuthSuccess={handleAuthSuccess}>
      {user ? ( // Render only when the user is authenticated
        <>
          {/* Habits Modal */}
          {habitsModal && (
            <div
              className="bg-black/75 w-full h-screen absolute top-0 left-0 flex items-center justify-center z-20"
              onClick={() => setHabitsModal(false)} // Close modal on overlay click
            >
              <div
                className="bg-slate-700 max-w-4xl rounded-xl p-4 relative z-20"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
              >
                <HabitsModal
                  user={user.uid}
                  onClose={() => setHabitsModal(false)}
                />
              </div>
            </div>
          )}
          {/* Habits Modal */}

          <h1 className="text-white/75">
            Welcome back, <span className="">{user.displayName}</span>
          </h1>

          <div className="grid sm:grid-cols-7 grid-rows-[1fr auto] gap-3 mt-5 mb-12 w-full h-full">
            {/* Habits Section */}
            <div className="bg-white/10 border text-white w-full border-white/15 backdrop-blur-md flex flex-col transition-all rounded-3xl py-4 px-4 sm:col-span-3 row-span-2">
              <h3 className="mb-4">Active Habits</h3>
              <ListHabits user_id={user.uid} />
            </div>

            {/* Daily Completion */}
            <div className="bg-white/10 border text-white w-full border-white/15 backdrop-blur-md transition-all rounded-3xl py-4 px-4 sm:col-span-2  aspect-square">
              <h3 className="mb-4">Daily Completion</h3>
            </div>

            {/* Streaks */}
            <div className="bg-white/10 border text-white w-full border-white/15 backdrop-blur-md transition-all rounded-3xl py-4 px-4 sm:col-span-2 aspect-square ">
              <h3 className="mb-4">Streaks</h3>
            </div>

            {/* Habits Assistant */}
            <div className="bg-white/10 border text-white w-full border-white/15 backdrop-blur-md flex flex-col transition-all rounded-3xl py-4 px-4 sm:col-span-4  ">
              <h3 className="mb-4">Habits Assistant</h3>
              <div className="h-full min-h-[300px] flex items-center justify-center">
                Chatbot
              </div>
            </div>
          </div>
        </>
      ) : (
        // Loading placeholder while waiting for user authentication
        <div className="flex items-center justify-center h-screen">
          <p>Loading user information...</p>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default DashBoard;
