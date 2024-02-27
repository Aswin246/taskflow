import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3000/api/v1/task/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log response data to inspect structure and contents
        console.log("Response data:", response.data);

        // Ensure response.data is an array before setting tasks
        if (Array.isArray(response.data)) {
          setTasks(response.data); // Accessing the array of tasks within response.data
        } else {
          setTasks([]); // Initialize tasks as an empty array if no tasks found
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks");
      }
    };

    fetchTasks();
  }, []);
  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Tasks:</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>Description: {task.desc}</p>
            <p>End Date: {task.endDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
