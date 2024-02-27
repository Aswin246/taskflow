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

        console.log("Response data:", response.data);

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
          setTasks(sortedTasks);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-8 pt-7 mt-3 mx-10">
      {error && <p>{error}</p>}
      {tasks.map((task) => (
        <div className="bg-teal-600 rounded-lg p-5 text-white" key={task._id}>
          <div className="mb-2 tracking-widest font-mono font-extrabold flex justify-center text-lg  text-white">
            {task.desc}
          </div>
          <div className="mb-2 tracking-widest font-mono  flex justify-center">
            End Date: {task.endDate.substring(0, task.endDate.indexOf("T"))}
          </div>
          <div className="mb-2 flex justify-center font-mono ">
            Time: {task.endHour}:{task.endMinute}
          </div>
        </div>
      ))}
    </div>
  );
};
