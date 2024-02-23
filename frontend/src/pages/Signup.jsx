import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomLink } from "../components/BottomLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        username: username.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      console.log("Signup Response:", response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setError("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
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
          <div className="flex justify-center  tracking-widest font-mono font-extrabold text-2xl mb-2 ">
            Sign up
          </div>
          <InputBox
            type={"text"}
            placeholder={"Enter first name"}
            label={"First name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            type={"text"}
            placeholder={"Enter last name"}
            label={"Last name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
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
          <Button label={"Sign up"} onClick={signup} />
          {error && (
            <p className="text-black flex justify-center items-center">
              {error}
            </p>
          )}
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
