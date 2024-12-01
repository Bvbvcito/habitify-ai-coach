// React
"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

// Static Categories
import { habitCategories } from "@/data/habitCategories";

// Global Theme Context
import { useGlobalContext } from "@/contexts/GlobalContext";

// Next UI
import {
  Select,
  SelectItem,
  Textarea,
  Input,
  Card,
  CardBody,
  Radio,
  RadioGroup,
  Switch,
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";

// Icons
import { MdOutlineAddCircle } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { IoIosAlarm } from "react-icons/io";
import HabitRecap from "@/components/habits/HabitRecap";

const CreateHabit = () => {
  // Initialize JWT Token
  const { token } = useAuth();

  //Initialize Router
  const router = useRouter();
  // Get user data
  const [user, setUser] = useState<User | null>(null);
  // API URL
  const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
  // Check form errors
  const [formerror, setFormError] = useState(false);

  // Day Selection Array
  const [daySelect, setDaySelect] = useState([]);

  // Global Theme Variable
  const { globalTheme } = useGlobalContext();

  // Set NextUi forms size
  const nextui_size = "md";

  //Set Form Data and add UID
  const [formData, setFormData] = useState({
    name: "",
    user_context: "",
    category: "",
    color: "",
    icon: "",
    schedule_type: "",
    user_id: user?.uid ?? "",
    days: [],
    exclude_weekends: false,
    description: "",
    schedule_radio: "Daily",
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
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, type, value } = target;

    // Check if the input is a checkbox or switch
    const updatedValue =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;

    // Handle category-specific updates
    const updatedCategory =
      name === "category" ? updatedValue : formData.category;
    const categoryData = habitCategories.find(
      (category) => category.name === updatedCategory
    ) || { color: "#000000", icon: "super icone", description: "" };

    // Update the formData state
    setFormData({
      ...formData,
      [name]: updatedValue, // Handle true/false for switches
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
    // Set schedule_type
    formData.schedule_type = formData.schedule_radio;
    formData.days = daySelect;
    // Set exclude weekends to false if schedule is set to weekly
    if (formData.schedule_type === "Weekly") formData.exclude_weekends = false;

    // console.log(JSON.stringify(formData, null, 5));
    // return null;

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

              {/* Habit Schedule */}
              <div
                className={`flex flex-col bg-black/50 backdrop-blur-md p-4 rounded-xl transition-all duration-300 gap-2 ${
                  formData.name.trim() !== "" &&
                  formData.category.trim() !== "" &&
                  formData.user_context.trim() !== ""
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                {" "}
                <div className="flex flex-row gap-2">
                  <IoIosAlarm className={`h-6 w-6 text-${globalTheme}-600 `} />
                  <h3 className="text-gray-100">Habit Scheduling</h3>
                </div>
                <div className="flex flex-row mt-3  gap-5">
                  <RadioGroup
                    className="w-full"
                    defaultValue="Daily"
                    name="schedule_radio"
                    color="primary"
                    orientation="vertical"
                    onChange={handleFormChanges}
                  >
                    <div
                      className={`${
                        formData.schedule_radio === "Daily"
                          ? `bg-${globalTheme}-600`
                          : "bg-black/20 border-white/15 border-1"
                      } p-4 rounded-xl w-full flex`}
                    >
                      {" "}
                      <Radio
                        value="Daily"
                        description={
                          <span className="text-gray-200">
                            Ideal to quickly improve on any given task
                          </span>
                        }
                      >
                        <span className={`font-bold text-gray-100 `}>
                          Daily Repeat
                        </span>
                      </Radio>
                    </div>

                    <div
                      className={`${
                        formData.schedule_radio === "Weekly"
                          ? `bg-${globalTheme}-600`
                          : "bg-black/20 border-white/15 border-1"
                      } p-4 rounded-xl w-full flex`}
                    >
                      <Radio
                        value="Weekly"
                        description={
                          <span className="text-gray-300">
                            For tasks that require less focus
                          </span>
                        }
                      >
                        <span className={`font-bold text-gray-100 `}>
                          Weekly Repeat
                        </span>
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-5">
                  {formData.schedule_radio === "Daily" && (
                    <Switch
                      defaultChecked={formData.exclude_weekends}
                      name="exclude_weekends"
                      onChange={handleFormChanges}
                      color="default"
                      size="sm"
                    >
                      Exclude Weekends
                    </Switch>
                  )}

                  {formData.schedule_radio === "Weekly" && (
                    <div className="flex flex-col gap-3 mb-4">
                      Select active days
                      <div className="bg-black/30 py-4 p-3 flex rounded-md items-center justify-center ">
                        <CheckboxGroup
                          label=""
                          color="default"
                          value={daySelect}
                          onValueChange={setDaySelect}
                          orientation="horizontal"
                        >
                          <Checkbox value="Monday">Mon </Checkbox>
                          <Checkbox value="Tuesday">Tue </Checkbox>
                          <Checkbox value="Wednesday">Wed </Checkbox>
                          <Checkbox value="Thursday">Thu </Checkbox>
                          <Checkbox value="Friday">Fri </Checkbox>
                          <Checkbox value="Saturday">Sat </Checkbox>
                          <Checkbox value="Sunday">Sun </Checkbox>
                        </CheckboxGroup>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-2 mt-10  flex justify-center mb-4 items-center">
                  <button className="custom-button flex">
                    <MdOutlineAddCircle className="w-[30px] h-[30px]" />{" "}
                    <span className="font-bold">Create New Habit</span>
                  </button>
                </div>
              </div>

              {/* Habit Schedule */}
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
