import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";


const initalState = {
    matricule :"",
    marque :"",
    modele :"",
    typecars :"",
    energie :"",
    date :"",
    dernière_vidange :0,
    
  
};



function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function NewCars() {
  const [state, dispatch] = useReducer(reducer, initalState);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/cars/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      await response.json();
      navigate("/Cars");
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { matricule, marque, modele, type, energie,date,dernière_vidange } = state;
 
  
  

  return (
    <div style={{ width: 700, margin: "10px auto" }}>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        
      <label className="block">
          <span className="text-gray-700">matricule</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="matricule"
            value={matricule}
            onChange={handleChange}
            placeholder="matricule"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">marque</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="marque"
            value={marque}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        <label className="block">
        <span className="text-gray-700">energie</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="energie"
            value={energie}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">dernière_vidange</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="dernière_vidange"
            value={dernière_vidange}
            onChange={handleChange}
            placeholder="dernière_vidange"
          />
        </label>
       
        
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default NewCars;
