"use client";
import { useState, useEffect } from "react";

export default function Home() {
  // Define Reesponse Data Type
  interface ResponseData {
    response: {
      name: string;
      date: string;
      // Add other properties as needed within the `data` object
    };
  }

  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null); // State for storing any errors

  async function postData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "This is a call from Next.js" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Convert response to JSON
      setResponseData(data); // Set the response data to state
    } catch (error) {
      setError((error as Error).message); // Set the error message to state
    }
  }

  useEffect(() => {
    postData();
  }, []);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div>
        <h1>Hello Next Flask</h1>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : responseData ? (
          <p>
            Response from Flask: {responseData.response.name}, born{" "}
            {responseData.response.date}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
