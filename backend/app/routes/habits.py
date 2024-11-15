from flask import Blueprint, request
from ..controllers.habits_controller import get_habits_data, add_new_habit

bp = Blueprint('habits', __name__)

@bp.route('/api/habits', methods = ["GET", "POST"])

def habits():
    if request.method == "GET":
        return get_habits_data()  
    
    if request.method == "POST":
        return add_new_habit()