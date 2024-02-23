import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomLink } from "../components/BottomLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const signin = async () => {
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        username: trimmedUsername,
        password: trimmedPassword,
      });
      setError("");
      localStorage.setItem("token", response.data.token);
      Navigate("/dashboard");
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occured. Please try again!");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-black h-screen ">
        <div className="bg-teal-600 p-10 flex flex-col rounded-md w-80">
          <div className="flex justify-center  tracking-widest font-mono font-extrabold text-2xl mb-2">
            Sign in
          </div>

          <InputBox
            type={"text"}
            placeholder={"Enter email"}
            label={"Username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            type={"password"}
            placeholder={"Enter password"}
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <Button label={"Sign in"} onClick={signin} />
          {error && <p>{error}</p>}
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
