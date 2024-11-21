from flask import Flask
from flask_cors import CORS
from .api.routes import category_routes, habit_routes


def launch_backend_server():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Use the specific origin if needed    

    # Register Controllers
    app.register_blueprint(habit_routes.habits_bp)
    app.register_blueprint(category_routes.category_bp)

    return app