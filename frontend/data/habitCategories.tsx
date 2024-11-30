export interface HabitCategory {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const habitCategories: HabitCategory[] = [
  {
    name: "Health & Wellness",
    description: "Physical and mental health, self-care, fitness, hydration.",
    color: "#7834F6",
    icon: "FaHeartbeat",
  },
  {
    name: "Productivity & Focus",
    description: "Work, study, planning, time management, and task completion.",
    color: "#3161A4",
    icon: "FaTasks",
  },
  {
    name: "Learning & Growth",
    description:
      "Education, skill-building, reading, and continuous improvement.",
    color: "#B639DC",
    icon: "FaBookOpen",
  },
  {
    name: "Relationships & Social",
    description: "Family time, friendships, socializing, and networking.",
    color: "#70E8A8",
    icon: "FaUsers",
  },
  {
    name: "Mindfulness & Spirituality",
    description:
      "Meditation, mindfulness practices, gratitude, and reflection.",
    color: "#D53840",
    icon: "FaSpa",
  },
  {
    name: "Finance & Budgeting",
    description: "Savings, budgeting, investments, and financial goals.",
    color: "#DFAC1D",
    icon: "FaPiggyBank",
  },
  {
    name: "Creativity & Hobbies",
    description:
      "Art, music, crafts, personal projects, and creative pursuits.",
    color: "#878787",
    icon: "FaPalette",
  },
  {
    name: "Home & Environment",
    description:
      "Cleaning, organizing, home maintenance, and eco-friendly habits.",
    color: "#178661",
    icon: "FaHome",
  },
  {
    name: "Nutrition & Diet",
    description: "Meal planning, healthy eating, cooking, and dietary goals.",
    color: "#13C3E2",
    icon: "FaCarrot",
  },
];
