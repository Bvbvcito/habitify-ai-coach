from flask import Flask
from flask_cors import CORS
from .routes import home


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Use the specific origin if needed    

    
    # # Register blueprints
    # app.register_blueprint(home.bp)
    # app.register_blueprint(about.bp)
    # app.register_blueprint(contact.bp)

    app.register_blueprint(home.bp)

    return app