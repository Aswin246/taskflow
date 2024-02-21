import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomLink } from "../components/BottomLink";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {};

  return (
    <>
      <div className="flex justify-center items-center bg-black h-screen ">
        <div className="bg-teal-600 p-10 flex flex-col rounded-md w-80">
          <div className="flex justify-center  tracking-widest font-mono font-extrabold text-2xl mb-2">
            Sign in
          </div>

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
          <Button label={"Sign in"} onClick={signin} />
          <BottomLink
            to={"/signup"}
            label={"Dont have an account?"}
            linkLabel={"Sign up"}
          ></BottomLink>
        </div>
      </div>
    </>
  );
};
