import axios from "axios";
import React, {useEffect, useState,useReducer } from "react";
import { getCars } from "./api/cars";
import { useNavigate , useParams } from "react-router-dom";




function EditCars() {

   
  let navigate = useNavigate();
  const {id} = useParams();

  const [cars, setcars] = useState({
    matricule :"",
    marque :"",
    modele :"",
    typecars :"",
    energie :"",
    date :"",
    dernière_vidange :0,
    prochain_vidange :0,
    kilométrage :"",
    
  });
 
  

  const {matricule, marque, modele, type, energie,date,dernière_vidange,prochain_vidange,Kilométrage } = cars;

  const handleChange =  e => {
    setcars({ ...cars,[e.target.name]:e.target.value});
  };

  

  useEffect(() => {
    loadagents();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/cars/modifier/${id}`, cars);
    navigate("/Cars");
  };  
 
  const loadagents = async () => {
    const result = await axios.get(`http://localhost:5000/cars/getone/${id}`);
    setcars(result.data[0]);
    
  };




 
    return (
        <div style={{ width: 700, margin: "10px auto" }}>
      <form className="grid grid-cols-1 gap-6" onSubmit={e => onSubmit(e)}>
        
      <label className="block">
          <span className="text-gray-700">matricule</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="matricule"
            value={matricule}
            onChange={e=>handleChange(e)}
            placeholder="matricule"
            disabled
          />
        </label>
        <label className="block">
          <span className="text-gray-700">marque</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="marque"
            value={marque}
            onChange={e=>handleChange(e)}
            placeholder="marque"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">modele</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="modele"
            placeholder="modele"
            value={modele}
            onChange={e=>handleChange(e)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">type</span>
          <input
            name="type"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            value={type}
            placeholder="typeCars"
            onChange={e=>handleChange(e)}
          />
        </label>
        <label className="block">
        <span className="text-gray-700">energie</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="energie"
            value={energie}
            onChange={e=>handleChange(e)}
            placeholder="energie"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Date</span>
          <input
            name="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            value={date}
            onChange={e=>handleChange(e)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">dernière_vidange</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="dernière_vidange"
            value={dernière_vidange}
            onChange={e=>handleChange(e)}
            placeholder="dernière_vidange"
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

export default EditCars;

