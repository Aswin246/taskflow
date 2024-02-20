import { InputBox } from "../components/InputBox";

export const Signup = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-black h-screen ">
        <div className=" bg-slate-400 p-10 flex flex-col ">
          <div>Enter your username</div>
          <InputBox placeholder={"username"}></InputBox>
          <div>Enter your username</div>
          <InputBox placeholder={"username"}></InputBox>
          <InputBox placeholder={"username"}></InputBox>
          <InputBox placeholder={"username"}></InputBox>
        </div>
      </div>
    </>
  );
};
