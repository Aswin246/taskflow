// ./pages/Home.jsx
import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const abc = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen  bg-black">
        <Heading label=" TaskFlow" />
        <SubHeading label="Simplify Your Workflow with TaskFlow" />
        <div className=" flex  justify-center  ">
          <Button label="Sign up" onClick={abc}></Button>
          <Button label="Sign in" onClick={abc}></Button>
        </div>
      </div>
    </>
  );
};

export default Home;
