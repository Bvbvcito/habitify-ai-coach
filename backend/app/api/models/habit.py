from datetime import datetime
class Habit:
    def __init__(
        self, 
        name: str, 
        category: str, 
        color: str, 
        icon: str, 
        schedule_type: str, 
        days: list, 
        exclude_weekends: bool, 
        user_context: str,
        createdAt: datetime = None
        
    ):
        self.name = name
        self.category = category
        self.color = color
        self.icon = icon
        self.schedule_type = schedule_type
        self.days = days
        self.exclude_weekends = exclude_weekends
        self.user_context = user_context
        self.createdAt = createdAt or datetime.now() 



    def to_dict(self):
        """
        Convert a Habit instance back into a Firestore-compatible dictionary.
        """
        return {
            "name": self.name,
            "category": self.category,
            "color": self.color,
            "icon": self.icon,
            "schedule": {
                "type": self.schedule_type,
                "days": self.days,
                "excludeWeekends": self.exclude_weekends
            },
            "user_context": self.user_context,
            "createdAt" : self.createdAt or datetime.now()
        }

    def __repr__(self):
        return (f"Habit(name={self.name}, category={self.category}, color={self.color}, "
                f"icon={self.icon}, schedule_type={self.schedule_type}, days={self.days}, "
                f"exclude_weekends={self.exclude_weekends}, user_context={self.user_context}, createdAt={self.createdAt})")

if __name__ == '__main__':
    test = Habit("Une nouvelle tâche", "Catérogie super", "#ff7800", "Icone super", "daily", "monday, friday", False, "This is a super task")

    print (test.to_dict())