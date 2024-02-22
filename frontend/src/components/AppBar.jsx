import axios from "axios";
import { useEffect, useState } from "react";
export const AppBar = () => {
  const [firstName, setFirstName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/firstName",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchName();
  }, []);

  useEffect(() => {
    const getCurrentTime = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/currentDateTime",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCurrentTime(response.data.date);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentTime();

    const intervalId = setInterval(() => {
      getCurrentTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-white bg-teal-600 flex flex-row rounded-lg p-4 mx-5 tracking-widest font-mono text-xl justify-between">
      <div> Welcome {firstName} !</div>
      <div> {currentTime} </div>
    </div>
  );
};
