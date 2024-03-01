import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TaskPopup } from "./AddTask";

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

export const TaskContainer = ({ updated }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [updated]);

  // const refreshTasks = async () => {
  //   try {
  //     const fetchedTasks = await fetchTasks();
  //     setTasks(fetchedTasks);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  // refreshTasks();

  const handleEditClick = () => {};
  const handleDeleteClick = () => {};
  return (
    <div className="grid grid-cols-4 gap-8 pt-7 mt-3 mx-10">
      {error && <p>{error}</p>}
      {tasks.map((task) => (
        <div className="bg-teal-600 rounded-lg p-5 text-white" key={task._id}>
          <div className=" rounded-xl bg-teal-900 py-1 mt-1 mb-2 items-center justify-center">
            <div className="mb-2 tracking-widest font-mono font-extrabold flex justify-center text-lg  text-white">
              {task.desc}
            </div>
          </div>
          <div className="mb-2 tracking-widest font-mono  flex justify-center">
            End Date: {task.endDate.substring(0, task.endDate.indexOf("T"))}
          </div>
          <div className="mb-2 flex justify-center font-mono ">
            Time: {task.endHour}:{task.endMinute}
          </div>
          <div className="flex justify-center space-between mt-3">
            <FontAwesomeIcon
              icon={faEdit}
              onClick={handleEditClick}
              className={`cursor-pointer mr-4`}
            />{" "}
            <FontAwesomeIcon
              icon={faTrash}
              onClick={handleDeleteClick}
              className={`cursor-pointer`}
            />{" "}
          </div>
        </div>
      ))}
    </div>
  );
};
