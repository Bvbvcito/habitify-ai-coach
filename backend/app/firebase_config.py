import firebase_admin
from firebase_admin import credentials, firestore
import os
from flask import jsonify
from datetime import datetime

# Initialize Firebase app if it hasn't been initialized
if not firebase_admin._apps:
    cred_path = os.path.join(os.path.dirname(__file__), '../config/firebase_credentials.json')
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

# Firestore client instance
db = firestore.client()

habits_collection = db.collection("habits")



# habit_id = 'WM0QpJBXvWcID52AqOSM'  # Replace with the actual habit document ID
# completed_date = datetime.now() # Use a consistent date format

# # Reference to the specific habit document
# habit_ref = db.collection('habits').document(habit_id)

# # Check if the habit document exists
# if habit_ref.get().exists:
#     # If the habit exists, add the completed date to the subcollection
#     completed_dates_ref = habit_ref.collection('completed_dates')
#     new_doc_ref  = completed_dates_ref.add({
#         'date': completed_date
#     })
#     print(f"Completed date added with document id:{new_doc_ref[1].id}")
# else:
#     print("Habit does not exist. No date added.")

# habit_ref = db.collection('habits').document(habit_id)
# habit_ref.update({"habit_name" : "roudoudou"})
