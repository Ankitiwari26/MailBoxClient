import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";
import ReplyMail from "./Component/ReplyMail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reply" element={<ReplyMail />} />
      </Routes>
    </Router>
  );
}

export default App;
