import { LuBrainCircuit } from "react-icons/lu";
import { useEffect, useState } from "react";
import ChatTypingEffect from "../ui/ChatTyping";
import { Spinner } from "@nextui-org/react";
const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
const ChatBot = ({
  habit_id,
  user_id,
}: {
  habit_id: string;
  user_id: string;
}) => {
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  // Query Chat Bot Assistant
  const queryAssistant = async () => {
    try {
      setLoading(true); // Set loading state to true
      setChatResponse(""); // Clear previous response
      // Set API URL and endpoint
      const response = await fetch(`${apiUrl}/api/chatbot/get`, {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ habit_id: habit_id, user_id: user_id }), // Add the message as the payload
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response (if needed)
      const result = await response.json();

      setChatResponse(result.data);
    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger queryAssistant in useEffect
  useEffect(() => {
    if (habit_id != "") {
      queryAssistant();
    }
  }, [habit_id]); // Empty dependency array ensures it runs once on mount

  return (
    <>
      {/* If no task is selected, chatbot is idle */}
      {habit_id === "" && (
        <div className="flex  flex-col items-center">
          <div>
            <LuBrainCircuit className="h-12 w-12 text-slate-300 mb-4 animate-pulse" />
          </div>
          <div className="font-normal">Advisor is idle</div>
          <small>Please click on a task to get smart feedback</small>
        </div>
      )}

      {/* Display Chatbot if habit is selected */}

      {habit_id !== "" && (
        <div className="h-full w-full rounded-xl text-sm bg-black/50 p-6  text-justify flex ">
          {loading === true ? (
            <div className="flex flex-col items-center self-center  mx-auto text-center">
              <div className="mb-3">
                <Spinner size="lg" color="default" />
              </div>
              <div className="font-normal">Advisor is thinking</div>
              <small>Please Wait...</small>
            </div>
          ) : (
            <ChatTypingEffect chatResponse={chatResponse} />
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
