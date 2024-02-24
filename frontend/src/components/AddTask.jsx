import { Button } from "./Button";
import { useState } from "react";
import { InputBox } from "./InputBox";

function TaskPopup({ onClose, onSave }) {
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    if (description.trim() === "") {
      alert("Please enter a description.");
      return;
    }

    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      alert("Please enter valid hours (0-23) and seconds (0-59).");
      return;
    }

    if (date.trim() === "") {
      alert("Please enter a valid date.");
      return;
    }

    onSave({ description, hour, minute, date });
    setDescription("");
    setMinute(""), setHour(""), setDate("");
    onClose();
  };
  const isValidHour = (value) => {
    return value >= 0 && value <= 23;
  };

  const isValidMinute = (value) => {
    return value >= 0 && value <= 59;
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
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
                const value = parseInt(e.target.value);
                if (!isNaN(value) && isValidHour(value)) {
                  setHour(value);
                }
              }}
              min={0}
              max={23}
              className="rounded-md p-2 tracking-tight font-mono text-black  mx-2 w-full"
              onKeyDown={handleKeyDown}
            />
            <input
              type="number"
              placeholder="Enter minute"
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && isValidMinute(value)) {
                  setMinute(value);
                }
              }}
              min={0}
              max={59}
              className="rounded-md p-2 tracking-tight font-mono text-black w-full"
              onKeyDown={handleKeyDown}
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

  const handleAddTask = () => {
    setPopup(true);
  };

  const cancelAddtask = () => {
    setPopup(false);
  };

  const saveTask = (task) => {
    console.log(task);
  };
  return (
    <>
      <div className="flex flex-row justify-center mt-4">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-3 py-1 w-40"
          onClick={handleAddTask}
          label={"Create task"}
        />
      </div>

      {popup && <TaskPopup onSave={saveTask} onClose={cancelAddtask} />}
    </>
  );
};
