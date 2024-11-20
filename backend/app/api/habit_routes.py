#Import Db Instance from firebase_config
from .firebase_config.firebase_config import db
from flask import request, jsonify, Blueprint
from pprint import pprint

#Import Categories as Dictionary
from ..staticdata.categories import habit_categories


#Initialize db and collection
habits_collection = db.collection("habits")

# Initialiaze a Blueprint for habits
habits_bp = Blueprint('habits', __name__, url_prefix='/api/habits')

#Create a new habit
@habits_bp.route('/get/<user_id>', methods=['GET'])
def get_habits_data(user_id):
    try:
        # Reference the user's habits subcollection using the user_id
        user_ref = db.collection('users').document(user_id).collection('habits')
        habits = user_ref.stream()

        # Collect all habits in a list for display and response
        habits_list = []
        for habit in habits:
            habit_data = habit.to_dict()
            habit_data['id'] = habit.id  # Add document ID to habit data
            habits_list.append(habit_data)
        
        # Return the habits as a JSON response on success
        return jsonify(habits_list), 200

    except Exception as error:
        # Log the exception details
        print("Error while retrieving habits:", str(error))
        
        # Return a structured error response
        return jsonify({
            "error": "Failed to retrieve habits.",
            "details": str(error)
        }), 500




#Add a new habit
@habits_bp.route('/create', methods=['POST'])

def add_new_habit():
    try:
        # Parse request
        data = request.json
        user_id = data.get("user_id")

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        print("Received JSON data:", data)

        # Reference to user's habits subcollection
        habit_ref = db.collection("users").document(user_id).collection("habits")

        # New habit structure with defaults
        new_habit = {
            "name": data.get("habit_name"),
            "icon": data.get("icon", "💧"),
            "color": data.get("color"),

            "category": data.get("category"),
            "user_context": data.get("context"),
            "schedule": {
                "type": "daily",
                "days": data.get("schedule_days", []),
                "excludeWeekends": data.get("exclude_weekends", True)
            }
        }

        # Add habit to Firestore and retrieve creation info
        creation_time, result = habit_ref.add(new_habit)
        print(f"Successfuly added habit {new_habit['name']} with id: {result.id}")

        return jsonify({
            "message": "Habit successfully added!",
            "habit_id": result.id,
            "creation_time": creation_time
        }), 201

    except Exception as error:
        print("Error while adding a new habit:", str(error))
        return jsonify({
            "error": "Failed to add habit.",
            "details": str(error)
        }), 500


#Add a new habit
@habits_bp.route('/delete', methods=['POST'])

def delete_habit():
    try:
        # Parse request
        data = request.json
        user_id = data.get("user_id")
        habit_id = data.get("habit_id")

        if not user_id or not habit_id:
            return jsonify({"error": "User ID and habit ID are required"}), 400

        print("Received JSON data:", data)

        # Reference to user's habits subcollection
        habit_ref = db.collection("users").document(user_id).collection("habits").document(habit_id)

        # Delete Habit
        if habit_ref.delete():
            print("Succesfuly deleted habit")
            return jsonify({
                "message": "Habit successfully deleted!",

            }), 200

    except Exception as error:
        print("Error while deleting habit:", str(error))
        return jsonify({
            "error": "Failed to delete habit.",
            "details": str(error)
        }), 500

if __name__ == '__main__':
    pprint(habit_categories)