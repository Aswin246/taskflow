import { AddTask } from "../components/AddTask";
import { AppBar } from "../components/AppBar";
import { TaskContainer } from "../components/TaskContainer";
import { useState } from "react";

export const Dashboard = () => {
  const [updated, setUpdated] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const handleTaskAddedOrUpdate = () => {
    // Toggle the state to trigger a re-render of Dashboard
    setRefresh((prevState) => !prevState);
    setUpdated(true);
  };
  return (
    <div className="bg-black  ">
      <AppBar />
      <AddTask onTaskAddedOrUpdate={handleTaskAddedOrUpdate} />
      <TaskContainer updated={updated} />
    </div>
  );
};
