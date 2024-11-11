"use client";
import { useState } from "react";

const HabitsPage = () => {
  const [formData, setFormData] = useState({ task_name: "", context: "" });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      alert(JSON.stringify(formData));
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("coucou");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      alert("Custom error" + error);
    }
  };

  return (
    <>
      <div className="">
        <form onSubmit={handlePost} action="">
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="task_name"
              value={formData.task_name}
              placeholder="Task Name"
              className=" placeholder:text-xs px-1 text-gray-500 my-2"
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="context"
              value={formData.context}
              placeholder="Context"
              className=" placeholder:text-xs px-1 text-gray-500 my-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default HabitsPage;
