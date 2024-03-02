import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    if (!token || !jwtDecode(token)) {
      console.error("Missing or invalid token");
      return [];
    }

    const response = await axios.get(
      `http://localhost:3000/api/v1/task/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (Array.isArray(response.data[0])) {
      const sortedTasks = response.data[0].sort((a, b) => {
        const dateComparison = new Date(a.endDate) - new Date(b.endDate);
        if (dateComparison !== 0) {
          return dateComparison;
        }

        const hourComparison = a.endHour - b.endHour;
        if (hourComparison !== 0) {
          return hourComparison;
        }
        return a.endMinute - b.endMinute;
      });
      return sortedTasks;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error fetching tasks");
  }
};
