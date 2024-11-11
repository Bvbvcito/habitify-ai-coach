import { getAuth } from "firebase/auth";

const BASE_URL = process.env.NEXT_PUBLIC_FLASK_API_URL;

async function getHabits() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User not logged in.");
    return;
  }

  const userId = user.uid;

  try {
    const response = await fetch(`${BASE_URL}/api/habits/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
}

export { getHabits };
