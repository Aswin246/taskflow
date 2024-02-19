// ./pages/Home.jsx
import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Heading label="TaskFlow" />
          <SubHeading label="Simplify Your Workflow with TaskFlow " />
        </div>
      </div>
    </>
  );
};

export default Home;
