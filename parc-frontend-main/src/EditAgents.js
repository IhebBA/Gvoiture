import axios from "axios";
import React, {useEffect, useState,useReducer } from "react";
import { getAgents } from "./api/agents";
import { useNavigate , useParams } from "react-router-dom";




function EditAgents() {

   
  let navigate = useNavigate();
  const {id} = useParams();

  const [agents, setagents] = useState({
    idA :"",
    cin : "",
    nom: "",
    date:"",
    
  });
 
  

  const {idA,cin,nom,date} = agents;

  const handleChange =  e => {
    setagents({ ...agents,[e.target.name]:e.target.value});
  };

  

  useEffect(() => {
    loadagents();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/agents/modifier/${id}`, agents);
    navigate("/agents");
  }; 
 
  const loadagents = async () => {
    const result = await axios.get(`http://localhost:5000/agents/getone/${id}`);
    setagents(result.data[0]);
    
  };




 
    return (
        <div style={{ width: 700, margin: "10px auto" }}>
        <form className="grid grid-cols-1 gap-6" onSubmit={e => onSubmit(e)}>
        <label className="block">
          <span className="text-gray-700">ID</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="idA"
            value={idA}
            onChange={e=>handleChange(e)}
            placeholder="ID"
            disabled
          />
        </label>
        <label className="block">
          <span className="text-gray-700">cin</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="cin"
            value={cin}
            onChange={e=>handleChange(e)}
            placeholder="numero cin"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">nom</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="nom"
            placeholder="nom"
            value={nom}
            onChange={e=>handleChange(e)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Date d’embauche</span>
          <input
            name="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            value={date}
            onChange={e=>handleChange(e)}
          />
        </label>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            modifier
          </button>
        </form>
      </div>
    );
}

export default EditAgents;

