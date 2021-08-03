import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initalState = {
  idA:"",
  cin : "",
  nom: "",
  date :"",
  
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function NewAgents() {
  const [state, dispatch] = useReducer(reducer, initalState);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/agents/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      await response.json();
      navigate("/agents");
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { idA,cin,nom,date } = state;

  return (
    <div style={{ width: 700, margin: "10px auto" }}>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        
      <label className="block">
          <span className="text-gray-700">ID</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="idA"
            value={idA}
            onChange={handleChange}
            placeholder="ID"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">cin</span>
          <input
            type="Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="cin"
            value={cin}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Date d’embauche</span>
          <input
            name="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            value={date}
            onChange={handleChange}
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

export default NewAgents;
