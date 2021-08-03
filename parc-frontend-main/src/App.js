import React, {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewMission from "./NewMission";
import NewMaintenance from "./NewMaintenance";
import Navbar from "./Navbar";
import Rapports from "./Rapports";
import Entretiens from "./Entretiens";
import Agents from "./Agents";
import EditMission from './EditMission';
import EditEntretien from "./EditEntretien";
import NewAgents from "./NewAgents";
import EditAgents from "./EditAgents";
import CARS from "./CARS";
import NewCars from "./NewCars";
import EditCars from "./EditCars";
import Login from "./Login";
import useToken from "./useToken";

function setToken(userToken) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {

  const [token, setToken] = useState(getToken());
 
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <Navbar />
      
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rapports" element={<Rapports />} />
        <Route path="/entretiens" element={<Entretiens />} />
        <Route path="nouvelle-mission" element={<NewMission />} />
        <Route path="nouveau-entretien" element={<NewMaintenance />} />
        <Route path="/EditMission/:id" element={<EditMission />} />
        <Route path="/EditEntretien/:id" element={<EditEntretien />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="nouveau-agents" element={<NewAgents />} />
        <Route path="/EditAgents/:id" element={<EditAgents />} />
        <Route path="/Cars" element={<CARS />} />
        <Route path="nouveau-cars" element={<NewCars/>} />
        <Route path="/EditCars/:id" element={<EditCars />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     
    </div>
  );
}

export default App;
