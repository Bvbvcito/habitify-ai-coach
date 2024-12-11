import google.generativeai as genai
import random

import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

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

        # Retreive user id and habit id to create prompt
        habit_id = data.get("habit_id")
        user_id = data.get("user_id")
        
        # Call Habit Service to get data from selected habit
        habit_service = HabitService()
        h = habit_service.get_one_habit(user_id=user_id, habit_id=habit_id)

        prompt = f"I need advice for: {h.name}. {h.user_context}."

        response = self.model.generate_content(f"{random.choice(sys_prompts)}\n\n{prompt}")
        return response.text
    
    def basic_chat(self, prompt):
        response = self.model.generate_content(f"{self.sys_prompt} {prompt}")
        return response.text
    
    def model_info(self)->str:
        return(self.model_name)

if __name__ == "__main__":
    assistant = AssistantService(sys_prompt="You are an assistant that summarizes data")
    test = assistant.basic_chat(f"Microsoft Corporation develops and supports software, services, devices and solutions worldwide. The Productivity and Business Processes segment offers office, exchange, SharePoint, Microsoft Teams, office 365 Security and Compliance, Microsoft viva, and Microsoft 365 copilot; and office consumer services, such as Microsoft 365 consumer subscriptions, Office licensed on-premises, and other office services. This segment also provides LinkedIn; and dynamics business solutions, including Dynamics 365, a set of intelligent, cloud-based applications across ERP, CRM, power apps, and power automate; and on-premises ERP and CRM applications. The Intelligent Cloud segment offers server products and cloud services, such as azure and other cloud services; SQL and windows server, visual studio, system center, and related client access licenses, as well as nuance and GitHub; and enterprise services including enterprise support services, industry solutions, and nuance professional services. The More Personal Computing segment offers Windows, including windows OEM licensing and other non-volume licensing of the Windows operating system; Windows commercial comprising volume licensing of the Windows operating system, windows cloud services, and other Windows commercial offerings; patent licensing; and windows Internet of Things; and devices, such as surface, HoloLens, and PC accessories. Additionally, this segment provides gaming, which includes Xbox hardware and content, and first- and third-party content; Xbox game pass and other subscriptions, cloud gaming, advertising, third-party disc royalties, and other cloud services; and search and news advertising, which includes Bing, Microsoft News and Edge, and third-party affiliates. The company sells its products through OEMs, distributors, and resellers; and directly through digital marketplaces, online, and retail stores. The company was founded in 1975 and is headquartered in Redmond, Washington.")
    print(test)

    assistant.model_info()