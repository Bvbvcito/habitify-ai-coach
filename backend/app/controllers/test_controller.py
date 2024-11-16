from flask import Blueprint, request, jsonify

# Create a Blueprint for habits
test_bp = Blueprint('test', __name__, url_prefix='/test')

# Route to get all habits
@test_bp.route('/', methods=['GET'])
def get_habits():
    return """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Page</title>
        </head>
        <body>
            <h1>Welcome to my test page</h1>
        </body>
        </html>
    """