import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomLink } from "../components/BottomLink";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {};

  return (
    <>
      <div className="flex justify-center items-center bg-black h-screen ">
        <div className="bg-teal-600 p-10 flex flex-col rounded-md w-80">
          <div className="flex justify-center  tracking-widest font-mono font-extrabold text-2xl mb-2 ">
            Sign up
          </div>
          <InputBox
            placeholder={"Enter first name"}
            label={"First name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            placeholder={"Enter last name"}
            label={"Last name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            placeholder={"Enter email"}
            label={"Username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            placeholder={"Enter password"}
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <Button label={"Sign up"} onClick={signup} />
          <BottomLink
            to={"/signin"}
            label={"Already registered?"}
            linkLabel={"Sign in"}
          ></BottomLink>
        </div>
      </div>
    </>
  );
};
