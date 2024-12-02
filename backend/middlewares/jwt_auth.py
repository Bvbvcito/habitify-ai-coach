from flask import request, jsonify
import firebase_admin
from firebase_admin import credentials, auth

import os, sys
# Construct the absolute path to the service account JSON
config_path = os.path.join(os.path.dirname(__file__), "..", "config", "firebase_credentials.json")

# Initialize Firebase Admin
cred = credentials.Certificate(config_path)

def token_required(f):
    def decorator(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Authorization header is missing"}), 401

        parts = auth_header.split()
        if parts[0].lower() != "bearer" or len(parts) != 2:
            return jsonify({"error": "Invalid Authorization header format"}), 401

        token = parts[1]
        try:
            # Verify the token with Firebase Admin
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token  # Attach user info to the request
        except Exception as e:
            return jsonify({"error": "Invalid or expired token", "message": str(e)}), 401
        print("Success decodinc JWT Token")
        return f(*args, **kwargs)
    decorator.__name__ = f.__name__
    return decorator
