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

        const response = await axios.get(`/api/v1/task/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data);
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
