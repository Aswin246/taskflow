import { Button } from "./Button";
import { useState, useEffect } from "react";
import { InputBox } from "./InputBox";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchTasks } from "../pages/fetch";

export function TaskPopup({ onClose, updateTasks }) {
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (description.trim() === "") {
      alert("Please enter a description.");
      return;
    }

    if (
      isNaN(hour) ||
      hour < 0 ||
      hour > 23 ||
      isNaN(minute) ||
      minute < 0 ||
      minute > 59
    ) {
      alert("Please enter valid hours (0-23) and minutes (0-59).");
      return;
    }

    if (date.trim() === "") {
      alert("Please enter a valid date.");
      return;
    }
    try {
      const tokenFromLocalStorage = localStorage.getItem("token");
      const decoded = jwtDecode(tokenFromLocalStorage, { header: true });

      const userId = decoded.id;

      const response = await axios.post(
        "http://localhost:3000/api/v1/task/add",
        {
          //id: userId,
          desc: description,
          endDate: date,
          endHour: hour,
          endMinute: minute,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        }
      );

      updateTasks();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }

    setDescription("");
    setMinute(""), setHour(""), setDate("");
    if (!error) {
      onClose();
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-teal-600 p-8 rounded-lg">
        <InputBox
          label={"Description"}
          placeholder={"Add description here"}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type={"text"}
        />
        <div>
          <div className="p-1 tracking-wide font-thin font-mono text-white w-full ">
            Add end time here (24 hour format)
          </div>
          <div className="flex justify-center">
            <input
              type="number"
              placeholder="Enter hour"
              onChange={(e) => {
                const hour = parseInt(e.target.value);
                setHour(hour);
              }}
              className="rounded-md p-2 tracking-tight font-mono text-black  mx-2 w-full"
              min={0}
              max={23}
            />
            <input
              type="number"
              placeholder="Enter minute"
              onChange={(e) => {
                const minute = parseInt(e.target.value);
                setMinute(minute);
              }}
              className="rounded-md p-2 tracking-tight font-mono text-black w-full"
              min={0}
              max={59}
            />
          </div>
        </div>

        <InputBox
          label={"Task end date"}
          placeholder={"Add end date here"}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type={"date"}
        />
        <div className="pt-4 flex justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-3 py-1 w-40"
            onClick={handleSave}
            label={"Add"}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-3 py-1 w-40 ml-2"
            onClick={onClose}
            label={"Close"}
          />
        </div>
      </div>
    </div>
  );
}

export const AddTask = () => {
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleEditClick = () => {};
  const handleDeleteClick = () => {};

  const handleAddTask = () => {
    setPopup(true);
  };

  const cancelAddtask = () => {
    setPopup(false);
  };

  const fetchData = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center mt-4">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-3 py-1 w-40 h-10"
          onClick={handleAddTask}
          label={"Create task"}
        />
      </div>

      {popup && <TaskPopup onClose={cancelAddtask} updateTasks={fetchData} />}
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
    </>
  );
};
