from flask import Blueprint, request, jsonify
from ..firebase_config.firebase_config import db
import random, time
from ..models.chat_assistant import OllamaInterface


# Create a Blueprint for habits
assistant_bp = Blueprint('assistant', __name__, url_prefix='/api/assistant')

# Route to get all habits
@assistant_bp.route('/query', methods=['POST'])
def query_assistant():
    data = request.json
    habit_id = data.get("habit_id")
    user_id = data.get("user_id")


    try:
        # Reference to the specific habit document in Firestore
        user_ref = db.collection('users').document(user_id).collection('habits').document(habit_id)
        
        # Fetch the document
        habit_doc = user_ref.get()
        
        if habit_doc.exists:
            # Retrieve habit document from Firestore
            habit_data = habit_doc.to_dict()
            
            # Seed the random generator with current time
            random.seed(time.time())
            
            #Random prompts
            prompts = [
                # f'Provide a quick, actionable tip with emoticons about "{habit_data.get("name")}" in the "{habit_data.get("category")}" category. If you give suggestions, keep it at a maximum of 5 ',
                # # f'What is a creative way to improve "{habit_data.get("name")}"? ',
                # f'Give a concise, engaging tip with emoticons about "{habit_data.get("name")}". If you give suggestions, keep it at a maximum of 5',
                f'Limit your answer to 400 characters max. Add emoticons to enrich the answer. Give ideas and actionable tips for the user to complete: "{habit_data.get("name")}". ',
            ]

            selected_prompt = random.choice(prompts)
            print(selected_prompt)

            #Instance of Ollama ChatBot
            chat_assistant = OllamaInterface()            
            response = chat_assistant.chat(f"{habit_data.get('user_context')}", selected_prompt)

            #Return chatbot response to Next.js
            return jsonify(response)
        else:
            return jsonify("No habit found")
    except Exception as e:
        return jsonify(f"Error retrieving habit: {e}")
    
    

