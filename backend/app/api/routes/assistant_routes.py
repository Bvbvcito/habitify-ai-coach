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
                # f' Provide a quick, actionable tip with emoticons about "{habit_data.get("name")}" in the "{habit_data.get("category")}" category. If you give suggestions, keep it at a maximum of 5.  ',
                # # f' You are a smart assistant, specializing in "{habit_data.get("category")}"?  ',
                # f'Give a concise, engaging tip with emoticons about "{habit_data.get("name")}". If you give suggestions, keep it at a maximum of 5'. ,
                # f'You are an AI model providing responses in valid HTML format. Enclose your response in a <div> element with style="width: 100%;". Use <h4> for titles and ensure each <h4> has a class name of chat-title. Additionally, all <li> elements must include a class name of chat-item. Ensure your response is relevant to the habit category: {habit_data.get("name")}. Avoid using <ol> or any CSS styling beyond the specified inline width. Ensure the HTML structure is clean, semantic, and professional.'
f"""
You are an AI model providing responses in valid HTML format. Enclose the response in a div with a class name of chat-div. Use <h4> for titles and ensure each <h4> has a class name of chat-title. Use <p> for paragraphs and ensure each <p> has a class name of chat-p. Additionally, all <li> elements must include a class name of chat-item. Ensure <ul> elements have no class name.

When responding:
- Keep all answers concise and to the point, as this is meant to be a quick suggestion only.
- Use <h4> with the class name chat-title for section headings.
- Use <p> with the class name chat-p for explanatory text or instructions.
- Use bullet points (<li>) with the class name chat-item for lists of steps or guidelines.
- Ensure <ul> elements have no class name, and avoid creating nested lists; each list should be a flat structure without sub-lists.
- Ensure all content is clear, concise, and relevant.
- Avoid repetition and provide different answers every time.

Ensure your response is relevant to the habit category: "{habit_data.get("name")}". Ensure every response is wrapped in valid HTML and adheres to these requirements. Avoid using <ol> or any inline CSS beyond the specified full-width div styling.
"""






         ]

            selected_prompt = random.choice(prompts)
            print(selected_prompt)

            #Instance of Ollama ChatBot
            chat_assistant = OllamaInterface()            
            response = chat_assistant.chat(f" {habit_data.get('user_context')}.", selected_prompt)
            print(response)
            #Return chatbot response to Next.js
            return jsonify(response)
        else:
            return jsonify("No habit found")
    except Exception as e:
        return jsonify(f"Error retrieving habit: {e}")
    
    

