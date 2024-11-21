from flask import Blueprint, request, jsonify
from ...staticdata.categories import habit_categories
# Create a Blueprint for habits
category_bp = Blueprint('categories', __name__, url_prefix='/api/categories')

# Route to get all habits
@category_bp.route('/', methods=['GET'])
def get_categories():
    return jsonify(habit_categories)

