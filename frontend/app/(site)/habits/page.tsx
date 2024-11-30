// React
"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

// Static Categories
import { habitCategories } from "@/data/habitCategories";

// Next UI
import {
  Select,
  SelectItem,
  Textarea,
  Input,
  Card,
  CardBody,
} from "@nextui-org/react";

// Icons
import { MdOutlineAddCircle } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import HabitRecap from "@/components/habits/HabitRecap";

const CreateHabit = () => {
  //Initialize Router
  const router = useRouter();
  // Get user data
  const [user, setUser] = useState<User | null>(null);
  // API URL
  const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
  // Check form errors
  const [formerror, setFormError] = useState(false);

  // Set NextUi forms size
  const nextui_size = "lg";

  //Set Form Data and add UID
  const [formData, setFormData] = useState({
    name: "",
    user_context: "",
    category: "",
    color: "",
    icon: "",
    schedule_type: "Weekly",
    user_id: user?.uid,
    days: ["monday", "friday"],
    exclude_weekends: true,
    description: "",
  });

  //Pass UID to form Data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.uid,
      }));
    }
  }, [user]);

  //Handle form changes
  const handleFormChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Find the category data based on the updated category value
    const updatedCategory = name === "category" ? value : formData.category;
    const categoryData = habitCategories.find(
      (category) => category.name === updatedCategory
    ) || { color: "#000000", icon: "super icone", description: "" };

    // Update the formData state
    setFormData({
      ...formData,
      [name]: value,
      color: categoryData.color,
      icon: categoryData.icon,
      description: categoryData.description,
    });
  };

  //Send form data to Flask API
  const processFormData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.name || !formData.user_context) {
      setFormError(true);
      return null;
    } else {
      setFormError(false);
    }

    try {
      const response = await fetch(`${apiUrl}/api/habits/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        router.push("/dashboard");
      } else {
        console.error("Error creating habit:", result);
        if (result.message == "No Habit Name") {
          // Display Error Message
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ProtectedRoute onAuthSuccess={(user) => setUser(user)}>
      <>
        <h1>Create New Habit</h1>
        {formerror && (
          <Card
            className="border-none bg-red-500/80 text-white mt-5"
            shadow="sm"
          >
            <CardBody>
              <div className="flex flex-row items-center gap-2">
                <MdErrorOutline className="h-6 w-6" />
                All fields must be filled, please correct.
              </div>
            </CardBody>
          </Card>
        )}
        <div className="sm:flex sm:flex-row gap-5">
          <div className="w-full">
            <form
              onSubmit={processFormData}
              className="flex flex-col gap-4 mt-10  "
            >
              <Input
                size={nextui_size}
                type="text"
                label="Habit name"
                name="name"
                value={formData.name}
                onChange={handleFormChanges}
              />

              <Select
                size={nextui_size}
                items={habitCategories}
                label="Habit Category"
                placeholder="Please select a habit category"
                labelPlacement="inside"
                name="category"
                onChange={handleFormChanges}
              >
                {(category) => (
                  <SelectItem key={category.name} textValue={category.name}>
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span className=" text-sm text-gray-700">
                          {category.name}
                        </span>
                        <span className="text-small text-default-400">
                          {category.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <div className=" col-span-2">
                <Textarea
                  size={nextui_size}
                  minRows={5}
                  label="User Context"
                  placeholder="Give your task a user context: the more detailed, the more precise the AI Assistant will be."
                  name="user_context"
                  onChange={handleFormChanges}
                />
              </div>
              <div>wesh</div>
              <div className="col-span-2 mt-10  flex justify-center items-center">
                <button className="custom-button flex">
                  <MdOutlineAddCircle className="w-[30px] h-[30px]" />{" "}
                  <span className="font-bold">Create New Habit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="w-full mt-10 h-[500px] bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <HabitRecap formData={formData} />
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default CreateHabit;
