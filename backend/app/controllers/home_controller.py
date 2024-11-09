from flask import request, jsonify

def get_home_data():
    return jsonify({"message": "This is a GET request response from Home"}), 200

def post_home_data():
    data = request.get_json()
    print("Received:", data)  # Log received data on the server
    return jsonify({"message": "Received successfully!",  
        "response": {
            "name": "Cyril Busset",
            "date": "08.11.1975"
        }}), 200