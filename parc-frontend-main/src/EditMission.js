import axios from "axios";
import React, {useEffect, useState,useReducer } from "react";
import { getMissions } from "./api/missions";
import { useNavigate , useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCars } from "./api/cars";
import { getAgents } from "./api/agents";

/*function getPreviousDayDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  return currentDate.toISOString().slice(0, 10);
}

const initalState = {
  date: getPreviousDayDate(),
  car_mat: "196TU7741",
  chauffeur_id: "385",
  nom: "",
  distance: 0,
  carburant: 0,
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}*/

function EditMission() {

   
  let navigate = useNavigate();
  const {id} = useParams();
  const [cars, setcars] = useState([]);
  const [agents, setAgents] = useState([]);


  
  const [missions, setMissions] = useState({
    date: "",
    car_mat: "",
    chauffeur_id: "",
    nom: "",
    distance: "",
    carburant: ""
  });
 
  

  const { date, car_mat, chauffeur_id, nom, distance, carburant } = missions;

  const handleChange =  e => {
    setMissions({ ...missions,[e.target.name]:e.target.value});
  };

  


  

  
  /*const update = async () => {

        const resultat = await fetch('http://127.0.0.1:5000/missions/modifier/'+id,{
              method:'PUT'
          });
          const res = await resultat.json();
          console.log(res);
          navigate("/rapports");
    
          
  }*/
 
  

  useEffect(() => {
    loadMissions();
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

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/missions/modifier/${id}`, missions);
    navigate("/rapports");
  }; 
 
  const loadMissions = async () => {
    const result = await axios.get(`http://localhost:5000/missions/getone/${id}`);
   setMissions(result.data[0]);
    
  };


/* const loadMissions = async ()=>{
const result = await axios.get("http://127.0.0.1:5000/missions/getone/"+id);
console.log(result.data); 

 
 } */

 
    return (
        <div style={{ width: 700, margin: "10px auto" }}>
        <form className="grid grid-cols-1 gap-6" onSubmit={e => onSubmit(e)}>
        <label className="block">
            <span className="text-gray-700">Mission</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="nom"
              value={nom}
              placeholder="Mission"
              onChange={e=>handleChange(e)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Voiture</span>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="car_mat"
              value={car_mat}
              onChange={e=>handleChange(e)}
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
              onChange={e=>handleChange(e)}
            >
              {agents.map(
            ({ idA}) => (
              <option value={idA}>{idA}</option>
             )
            )}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Kilométrage</span>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="distance"
              placeholder="Kilométrage"
              value={distance}
              onChange={e=>handleChange(e)}  />
          </label>

          <label className="block">
            <span className="text-gray-700">Carburant</span>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="carburant"
              placeholder="Carburant"
              value={carburant}
              onChange={e=>handleChange(e)}   />
          </label>
          
          <label className="block">
            <span className="text-gray-700">Date</span>
            <input
              name="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="date"
              value={date}
              onChange={e=>handleChange(e)}   />
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

export default EditMission;

