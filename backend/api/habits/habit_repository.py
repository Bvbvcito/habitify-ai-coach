import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from config.firebase_config import db, DocumentReference, DocumentSnapshot
from api.habits.habit import Habit

class HabitRepository():
    """
    Repository layer for managing Habits using firebase database
    """
    def __init__(self):
        self.dbcollection = db.collection('users')

    def get_user_habits(self, user_id:str) -> list[Habit]:
        """
        Retrieves all habit instances associated with a specific user from the database.
        Args:
            user_id (str): The unique identifier of the user whose habits are to be fetched.
        Returns:
            list[Habit]: A list of Habit objects representing the user's habits.
        """

        # Reference the user's habits subcollection using the user_id
        user_habits = self.dbcollection.document(user_id).collection('habits')
        
        habits  = user_habits.get()

        # If there are habits, return an array of Habit objects
        return [Habit.from_dict(habit.to_dict(), habit.id) for habit in habits]
    
    def get_one_habit(self, user_id:str, habit_id:str) -> Habit:
        """
        Retrieves one habit instance associated with a specific user from the database.
        Args:
            user_id (str): The unique identifier of the user whose habits are to be fetched.
        Returns:
            list[Habit]: A list of Habit objects representing the user's habits.
        """
        habit_doc = self.dbcollection.document(user_id).collection("habits").document(habit_id).get()
        
        if habit_doc.exists:
            data = habit_doc.to_dict()    
            h = Habit.from_dict(data)
            h.id = habit_doc.id
            return h  
        else:
            raise ValueError("No habit found")

    
    def add_new_habit(self, user_id: str, habit: Habit) -> Habit:
        """
        Adds a Habit instance to the database under a specific user.
        Args:
            user_id (str): The unique identifier of the user to whom the habit belongs.
            habit (Habit): An instance of the `Habit` class representing the habit to be added.
        Returns:
            Habit: The habit instance with its updated details after being saved in the database.
        """
        habit_dict = habit.to_dict()
        # Remove Class ID, using Firestore autoid instead
        habit_dict.pop("id", None)

        _, result = self.dbcollection.document(user_id).collection("habits").add(habit_dict)
        # Update the Habit instance with the Firestore-generated ID
        print(f"Habit added with id: {result.id}")
        habit.id = result.id
        return habit
    
    def delete_habit(self, user_id:str, habit_id: str) -> str:
        """
        Deletes a habit instance from the database for a specific user and habit ID.
        Args:
            user_id (str): The unique identifier of the user whose habit is to be deleted.
            habit_id (str): The unique identifier of the habit to be deleted.
        Returns:
            str: A success message indicating the habit has been deleted.
        """
        if not user_id or not habit_id:
            raise ValueError("No habit id or user id provided")
        
        # Reference to user's habits subcollection
        habit_ref = db.collection("users").document(user_id).collection("habits").document(habit_id)
        habit_ref.delete()
        return f"Habit with ID {habit_id} for user {user_id} has been deleted successfully."


if __name__ == '__main__':
    repo = HabitRepository()
    
# Sample user ID
    user_id = "ftF9zAP9HYfgrnhaCyNdsz8uqvC3"
    habit_id = "UQUxBrReVFi7pjUjxS9K"

    # # Create a Habit instance
    # habit = Habit(
    #     name="Morning Run",
    #     category="Health & Wellness",
    #     color="#FF5733",
    #     icon="🏃",
    #     schedule_type="daily",
    #     user_context="user_context_example",
    #     exclude_weekends=False,
    # )

    test = repo.get_one_habit(user_id=user_id, habit_id=habit_id)
    print(test)
    