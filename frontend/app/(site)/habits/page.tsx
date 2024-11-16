"use client";
import React, { useState, useEffect } from "react";
import FloatingLabelInput from "@/components/ui/InputField";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import { User } from "firebase/auth";
import { MdOutlineAddCircle } from "react-icons/md";

const CreateHabit = () => {
  const [user, setUser] = useState<User | null>(null);

  //Pass UID to form Data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.uid, // Dynamically add user_id to form data
      }));
    }
  }, [user]);

  const [formData, setFormData] = useState({
    habit_name: "",
    context: "",
    category: "",
    user_id: user?.uid,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", JSON.stringify(formData, null, 2)); // Logs formData in JSON forma
  };

  return (
    <ProtectedRoute onAuthSuccess={(user) => setUser(user)}>
      <>
        <h1>Create New Habit</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-4  mt-10  "
        >
          <FloatingLabelInput
            name="habit_name"
            value={formData.habit_name}
            placeholder="Task Name"
            onChange={handleChange}
          />
          <FloatingLabelInput
            name="context"
            value={formData.context}
            placeholder="Context"
            onChange={handleChange}
          />
          <FloatingLabelInput
            name="category"
            value={formData.category}
            placeholder="Category"
            onChange={handleChange}
          />
          <div className="col-span-2 mt-10  flex justify-center items-center">
            <button className="custom-button flex">
              <MdOutlineAddCircle className="w-[30px] h-[30px]" />{" "}
              <span className="font-bold">Create New Habit</span>
            </button>
          </div>
        </form>
      </>
    </ProtectedRoute>
  );
};

export default CreateHabit;
