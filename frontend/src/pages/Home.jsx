// ./pages/Home.jsx
import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-green-200">
        <div className="flex flex-col justify-center items-center text-center bg-white w-auto rounded-lg p-8">
          <Heading label="TaskFlow" />
          <SubHeading label="Simplify Your Workflow with TaskFlow" />
        </div>
      </div>
    </>
  );
};

export default Home;
