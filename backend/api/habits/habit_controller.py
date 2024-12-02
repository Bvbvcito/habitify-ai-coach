#Import Db Instance from firebase_config
from flask import request, jsonify, Blueprint
from pprint import pprint

from .habit_service import HabitService
from .habit import Habit

# Initialiaze a Blueprint for habits
habits_bp = Blueprint('habits', __name__, url_prefix='/api/habits')

# Instanciate Habit Service
habit_service = HabitService()

#Get all habits for logged user
@habits_bp.route('/get/<user_id>', methods=['GET'])
def get_habits_data(user_id):
    # Print the token from the Authorization header
    auth_header = request.headers.get('Authorization')

    # Return Habits or error if repo raises error -> Json
    try:
        habits = habit_service.get_user_habits(user_id)
        return jsonify(habits), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

#Add a new habit
@habits_bp.route('/create', methods=['POST'])

def add_new_habit():
    data = request.json
    try:
        new_habit = habit_service.add_new_habit(data)
        return jsonify({"message": "Successfully added new habit",
                        "habit": new_habit.to_dict(),
                        "habit_id": new_habit.id}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


#Delete a habit
@habits_bp.route('/delete', methods=['POST'])
def delete_habit():
    data = request.json
    try:
        del_habit = habit_service.delete_habit(data)
        return jsonify({"message": "Successfully deleted habit",
                        "details": del_habit}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    
if __name__ == '__main__':
    pprint("yep")