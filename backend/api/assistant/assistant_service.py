import google.generativeai as genai
import random

import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from config.firebase_config import db, DocumentReference, DocumentSnapshot
from api.habits.habit import Habit
from api.habits.habit_service import HabitService


class AssistantService:
    """
    Service module for handling Gemini Assistant logic
    """
    _is_configured = False  # Class-level flag to track configuration

    def __init__(self, 
                 api_key: str = "AIzaSyAEWPN7oH4EUicQvkXYwxc5tgnTHscGEHM", 
                 sys_prompt: str = None, 
                 model_name: str = "gemini-1.5-flash"
        ):
        self.api_key = api_key
        self.model_name = model_name
        self.sys_prompt = sys_prompt or "You sing"

        
        # Configure genai only once
        if not AssistantService._is_configured:
            genai.configure(api_key=api_key)
            AssistantService._is_configured = True

        self.model = genai.GenerativeModel(model_name)

    def chat(self, data:dict) -> str:
        """
        Sends a request to Google Gemini and returns a response from the LLM
        Args:
            data (dict): user_id and habit_id sent from the frontend
        Returns:
            str: A html formatted response from Gemini
        """
        sys_prompts = [
            """
            You answer with beautifully formatted html, starting with a div with class chat-response.
            Do not add: ```html at the beginning and the end.
            You are a task completion assistant and should provide quick and actionable advice.
            Always suggest practical suggestions and ideas when asked about the task.
            Keep your answers quite short.
            Always start your answer with a h1 title.
            """,
            """
            You answer with beautifully formatted html, starting with a div with class chat-response.
            Do not add: ```html at the beginning and the end.
            You are a task habit manager assistant and should provide valuable advice to the user.
            Always suggest practical examples when asked about the task.
            Answers should be helful but concise.
            Always start your answer with a h1 title.


            """,
            """
            You answer with beautifully formatted html, starting with a div with class chat-response.
            Do not add: ```html at the beginning and the end.
            You are an interactive habit completion manager and should provide valuable suggestions to the user.
            Always suggest practical examples when asked about the task and do not end by asking a question.
            Answers should be readable pretty quickly.
            Always start your answer with a h1 title.


            """
        ]

        habit_id = data.get("habit_id")
        user_id = data.get("user_id")
        
        # Call Habit Service to get data from selected habit
        habit_service = HabitService()
        h = habit_service.get_one_habit(user_id=user_id, habit_id=habit_id)

        prompt = f"I need advice for: {h.name}. {h.user_context}."

        response = self.model.generate_content(f"{random.choice(sys_prompts)}\n\n{prompt}")
        return response.text
    
    def model_info(self)->str:
        return(self.model_name)
    
if __name__ == "__main__":
    assistant = AssistantService(sys_prompt="you answer with beautifully formatted html without head and body, start with a div")
    test = assistant.chat("What is the color of the sky?")
    print(test)

    assistant.model_info()