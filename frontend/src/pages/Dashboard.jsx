import { AddTask } from "../components/AddTask";
import { AppBar } from "../components/AppBar";

export const Dashboard = () => {
  return (
    <div className="bg-black h-screen ">
      <AppBar />
      <AddTask />
    </div>
  );
};
