import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";

import "./App.css";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
