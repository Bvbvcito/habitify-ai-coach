import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.firestore import DocumentReference, DocumentSnapshot

import os


# Initialize Firebase app if it hasn't been initialized
if not firebase_admin._apps:
    cred_path = os.path.join(os.path.dirname(__file__), 'firebase_credentials.json')
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

# Firestore client instance
db = firestore.client()



