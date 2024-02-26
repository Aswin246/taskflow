import { AddTask } from "../components/AddTask";
import { AppBar } from "../components/AppBar";
import { TaskContainer } from "../components/TaskContainer";

export const Dashboard = () => {
  return (
    <div className="bg-black h-screen ">
      <AppBar />
      <AddTask />
      <TaskContainer/>
    </div>
  );
};
