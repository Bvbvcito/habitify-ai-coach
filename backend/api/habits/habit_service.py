import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from api.habits.habit_repository import HabitRepository
from api.habits.habit import Habit

class HabitService:
    """
    Service module for handling Habits logic
    """
    def __init__(self):
        self.repository = HabitRepository()

    def get_user_habits(self, user_id: str) -> Habit:
        habits = self.repository.get_user_habits(user_id)
        
        # Convert Habits Objects to Dicts
        return [habit.to_dict() for habit in habits]
    
    def get_one_habit(self, user_id: str, habit_id:str) -> Habit:
        return self.repository.get_one_habit(user_id, habit_id)

    def add_new_habit(self, data) -> Habit:
        user_id = data.get("user_id")

        # Extract data
        name = data.get("name")
        category = data.get("category")
        color = data.get("color")
        icon = data.get("icon")
        user_context = data.get("user_context")
        schedule_type = data.get("schedule_type", "Daily")  # Default to "Daily" if not provided
        days = data.get("days", ["monday", "tuesday"])  # Default days if not provided
        exclude_weekends = data.get("exclude_weekends")

        # Create Habit instance
        new_habit = Habit(
            name=name,
            category=category,
            color=color,
            icon=icon,
            schedule_type=schedule_type,
            user_context=user_context,
            days=days,
            exclude_weekends=exclude_weekends
            )
        
        return self.repository.add_new_habit(user_id, new_habit)

    def delete_habit(self, data):
        user_id = data.get("user_id")
        habit_id = data.get("habit_id")
        
        return self.repository.delete_habit(user_id, habit_id)
    

if __name__ == "__main__":
    print("Oui")