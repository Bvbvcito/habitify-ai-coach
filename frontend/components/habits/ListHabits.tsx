import { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoAddCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { select } from "@nextui-org/react";

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
  user_context: string;
}

const ListHabits = ({
  user_id,
  setHabitId,
}: {
  user_id: string;
  setHabitId: (id: string) => void;
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [nohabit, setNoHabits] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshHabits, setRefreshHabits] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(null); // Track selected habit
  const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;

  const deleteHabit = async (
    event: React.MouseEvent<SVGElement>, // Accept event
    user_id: string,
    habit_id: string
  ) => {
    event.stopPropagation(); // Prevent the event from reaching the parent

    try {
      const response = await fetch(`${apiUrl}/api/habits/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, habit_id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete habit");
      }

      // Update state
      setHabitId("");
      setRefreshHabits((prev) => !prev);
    } catch (error) {
      console.error("Error deleting habit:", (error as Error).message);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchHabits() {
      try {
        const response = await fetch(`${apiUrl}/api/habits/get/${user_id}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log(result.length);
        // Set no habits to true if there are no habits to display
        if (result.length === 0) setNoHabits(true);
        if (isMounted) setHabits(result);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHabits();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshHabits]);

  return (
    <div className="flex w-full  flex-col gap-1">
      {/*  Display empty call to action if there are no habits */}
      {nohabit && (
        <Link href="/habits">
          <motion.div
            className="rounded-xl flex flex-col text-center  items-center w-full bg-black/50 border border-white/15 p-3 hover:bg-black/70 hover:shadow-md hover:cursor-pointer group"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              delay: 0.5,
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <h3 className="font-normal">It's quite empty in here</h3>
            <small>Click here to add new habits to track.</small>
            <IoAddCircleSharp className="text-slate-300 w-8 h-8 mt-3" />
          </motion.div>
        </Link>
      )}
      {/*  Display empty call to action if there are no habits */}

      {loading ? (
        Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-xl flex w-full bg-black/30 border border-white/15 p-4"
            >
              <div className="flex-shrink-0 bg-gray-300 rounded-full w-7 h-7 animate-pulse mr-4"></div>
              <div className="flex flex-col w-full">
                <div className="bg-gray-300 h-4 w-1/3 rounded-md animate-pulse mb-2"></div>
                <div className="bg-gray-300 h-3 w-1/2 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))
      ) : (
        <AnimatePresence mode="popLayout">
          {habits.map((habit) => (
            <motion.div
              onClick={() => {
                setHabitId(habit.id);
                setSelectedHabitId(habit.id);
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", duration: 0.3 }, // Hover animation duration
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
                transition: { type: "spring", duration: 0.8 }, // Exit animation duration
              }}
              key={habit.id}
              layout
              className={`rounded-xl flex w-full ${
                selectedHabitId === habit.id
                  ? "bg-black/80 border-white/50  text-red-500 "
                  : "bg-black/50  border-white/15"
              } p-3 hover:shadow-md hover:cursor-pointer hover:bg-black/80 transition-color  group 
              }`}
            >
              <div
                style={{ backgroundColor: habit.color }}
                className="flex-shrink-0 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3"
              >
                <IoMdSettings
                  // onClick={() => alert(`Task: ${habit.id} - User: ${user_id}`)}
                  className="text-white w-5 h-5 group-hover:text-white/80"
                />
              </div>
              {selectedHabitId === habit.id ? (
                <div className="flex flex-grow flex-col">
                  <span className="font-bold text-gray-100">{habit.name}</span>
                  <small className="mb-2 text-gray-100">{habit.category}</small>
                  <small className="text-gray-200">{habit.user_context}</small>
                </div>
              ) : (
                <div className="flex flex-grow flex-col">
                  <span className="font-bold text-gray-400">{habit.name}</span>
                  <small className="mb-2 text-gray-400">{habit.category}</small>
                  <small className="text-gray-400">{habit.user_context}</small>
                </div>
              )}
              <div className="flex flex-row gap-1 ml-3 justify-end items-end">
                <IoMdSettings
                  onClick={(event) => deleteHabit(event, user_id, habit.id)}
                  aria-label="Delete Habit"
                  className="text-white/20 w-8 h-8 group-hover:text-white/80 hover:bg-white/30 p-1 rounded-full transition-all duration-100"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ListHabits;
