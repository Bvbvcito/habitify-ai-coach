// utils/api.js
export async function createHabit(apiUrl:string, token:string, formData:[]) {
    try {
      const response = await fetch(`${apiUrl}/api/habits/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Insert JWT Token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return { success: true, data: result };
      } else {
        return { success: false, error: result };
      }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error);
            return { success: false, error: error.message };
          } else {
            console.error("Unknown error:", error);
            return { success: false, error: "An unknown error occurred." };
          }
    }
  }
  