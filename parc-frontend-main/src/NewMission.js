import React, { useReducer ,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCars } from "./api/cars";
import { getAgents } from "./api/agents";

function getPreviousDayDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  return currentDate.toISOString().slice(0, 10);
}

const initalState = {
  date: getPreviousDayDate(),
  car_mat: "",
  chauffeur_id: "",
  nom: "",
  distance: 0,
  carburant: 0,
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function NewMission() {
  const [state, dispatch] = useReducer(reducer, initalState);
  let navigate = useNavigate();
  const [cars, setcars] = useState([]);
  const [agents, setAgents] = useState([]);

useEffect(() => {

    let ignore = false;

    async function fetchData() {
      const data = await getCars();
      const dataA = await getAgents();
      console.log(data)
      if (!ignore){
        setcars(data);
        setAgents(dataA);
      } 

    }

    fetchData();
    //getdistance();
    return () => {
      ignore = true;
    };
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/missions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      await response.json();
      navigate("/rapports");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { date, car_mat, chauffeur_id, nom, distance, carburant } = state;

 
  return (
    <div style={{ width: 700, margin: "10px auto" }}>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
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
          <span className="text-gray-700">Voiture</span>
          <select
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="car_mat"
            value={car_mat}
            onChange={handleChange}
          >
            
            {cars.map(
            ({ matricule}) => (
              <option value={matricule}>{matricule}</option>
             )
            )}

          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Chauffeur</span>
          <select
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="chauffeur_id"
            value={chauffeur_id}
            onChange={handleChange}
          >
            {agents.map(
            ({ idA}) => (
              <option value={idA}>{idA}</option>
             )
            )}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Mission</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="nom"
            value={nom}
            onChange={handleChange}
            placeholder="Mission"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Kilométrage</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="distance"
            placeholder="Kilométrage"
            value={distance}
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Carburant</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="carburant"
            placeholder="Carburant"
            value={carburant}
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

export default NewMission;
