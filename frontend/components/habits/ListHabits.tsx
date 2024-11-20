import { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";

// Habis Data Structure
interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
  user_context: string;
}

const ListHabits = ({ user_id }: { user_id: string }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger refresh

  const deleteHabit = async (user_id: string, habit_id: string) => {
    const response = await fetch(`${apiUrl}/api/habits/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id, habit_id: habit_id }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to delete habit");
    }

    console.log("Habit Deleted Successfully");
    // Toggle refresh trigger to re-parse habits
    setRefreshTrigger((prev) => !prev);
  };

  useEffect(() => {
    let isMounted = true; // Tracks if the component is still mounted

    async function fetchHabits() {
      try {
        console.log("Fetching Firebase Data in progress...");

        const response = await fetch(`${apiUrl}/api/habits/get/${user_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Fetching Firestore Data ok");

        const result = await response.json();

        if (isMounted) {
          setHabits(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false); // Ensure state updates only if mounted
        }
      }
    }

    fetchHabits();

    return () => {
      isMounted = false; // Cleanup function to prevent fetch retry
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  return (
    <div className="flex w-full flex-col gap-1">
      {loading
        ? Array(5) // Display 5 skeleton loaders while loading
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="rounded-xl flex  w-full bg-black/30 border border-white/15 p-4"
              >
                {/* Skeleton Icon */}
                <div className="flex-shrink-0 bg-gray-300 rounded-full w-7 h-7 animate-pulse mr-4"></div>

                {/* Skeleton Text */}
                <div className="flex flex-col w-full">
                  <div className="bg-gray-300 h-4 w-1/3 rounded-md animate-pulse mb-2"></div>
                  <div className="bg-gray-300 h-3 w-1/2 rounded-md animate-pulse"></div>
                </div>
              </div>
            ))
        : habits.map((habit) => (
            <div
              className="rounded-xl flex w-full bg-black/50 border border-white/15 p-3 hover:bg-black/70  hover:shadow-md hover:cursor-pointer hover:scale-[1.03] group transition-all duration-100 ease-out"
              key={habit.id}
            >
              {/* Icon Section */}
              <div
                style={{ backgroundColor: habit.color }}
                className="flex-shrink-0  text-white rounded-full w-7 h-7 flex items-center justify-center mr-3"
              >
                <IoMdSettings
                  onClick={() => alert(`Task: ${habit.id} - User: ${user_id}`)}
                  className="text-white w-5 h-5 group-hover:text-white/80"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-grow flex-col">
                <span className="font-bold text-gray-100">{habit.name}</span>
                <small className="text-white/50   mb-2 ">
                  {habit.category}
                </small>
                <small className="text-gray-200">{habit.user_context}</small>
              </div>
              <div className="flex flex-row gap-1 ml-3 justify-end items-end ">
                <IoMdSettings
                  onClick={() => deleteHabit(user_id, habit.id)}
                  className="text-white/20 w-8 h-8 group-hover:text-white/80 hover:bg-white/30 p-1 rounded-full transition-all duration-100"
                />
              </div>
            </div>
          ))}
    </div>
  );
};

export default ListHabits;
