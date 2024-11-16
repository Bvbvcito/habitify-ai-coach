#Import Db Instance from firebase_config
from ..firebase_config import db

from flask import request, jsonify, Blueprint
from pprint import pprint
import random
#Import Categories as Dictionary
from ..staticdata.categories import habit_categories


#Initialize db and collection
habits_collection = db.collection("habits")

# Create a Blueprint for habits

habits_bp = Blueprint('habits', __name__, url_prefix='/habits')

#Retreive all habits
@habits_bp.route('/', methods=['GET'])
def get_habits_data():
    try:
        # Retrieve all documents from the habits collection
        habits = habits_collection.stream()
        # Collect all habits in a list for display and response
        habits_list = []
        for habit in habits:
            habit_data = habit.to_dict()
            habit_data['id'] = habit.id  # Add document ID to habit data
            habits_list.append(habit_data)
        
        # Pretty-print the habits for debugging
        pprint(habits_list)
        
        # Return the habits as a JSON response
        return jsonify(habits_list), 200

    except Exception as e:
        print("Exception occurred while retrieving habits:", str(e))
        return jsonify({"error": "Failed to retrieve habits.", "details": str(e)}), 500


#Testing same method different URL
@habits_bp.route('/test', methods=['GET'])
def flamby():
    return(habit_categories)

#Add a new habit
def add_new_habit():

    random_habit = random.choice(list(habit_categories.items()))
    new_habit = {
    "name": "Drink Water",
    "icon": "💧",
    "color": "blue",
    "category": random_habit[0],
    "category_context": random_habit[1],
    "user_context" : "",
    "schedule": {
        "type": "custom",
        "days": ["Monday", "Friday"],
        "excludeWeekends": True
  }
}
    update_time, result = habits_collection.add(new_habit)
    
    print(f"Added document with id {result.id}")
    if result:
        habit_id = result.id  # Get the document ID
        print("Habit successfully added with id:", result.id)
        return jsonify({
            "message": "Habit successfully added!",
            "habit_id": result.id,
            "creation time": update_time
        }), 200
    
    else:
        print("Error: Firestore did not return a valid reference.")
        return jsonify({"error": "Failed to add habit."}), 500


if __name__ == '__main__':
    pprint(habit_categories)