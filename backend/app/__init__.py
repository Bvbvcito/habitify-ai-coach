from flask import Flask
from flask_cors import CORS
from .controllers import habits_controller, test_controller


def launch_backend_server():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Use the specific origin if needed    

    # Register Controllers
    app.register_blueprint(habits_controller.habits_bp)
    app.register_blueprint(test_controller.test_bp)

    return app