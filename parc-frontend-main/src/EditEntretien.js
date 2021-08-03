import axios from "axios";
import React, {useEffect, useState,useReducer } from "react";
import { getMaintenances } from "./api/maintenances";
import { useNavigate , useParams } from "react-router-dom";
import { getCars } from "./api/cars";



function EditEntretien() {

   
  let navigate = useNavigate();
  const {id} = useParams();
  const [cars, setcars] = useState([]);

  const [maintenances, setMaintenances] = useState({
    date: "",
    car_mat: "",
    montant: "",
    description: ""
    
  });
 
  

  const { date, car_mat, montant, description } = maintenances;

  const handleChange =  e => {
    setMaintenances({ ...maintenances,[e.target.name]:e.target.value});
  };

  

  useEffect(() => {
    loadEntretiens();
    let ignore = false;

    async function fetchData() {
      const data = await getCars();
      console.log(data)
      if (!ignore){
        setcars(data);
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
    await axios.put(`http://localhost:5000/maintenances/modifier/${id}`, maintenances);
    navigate("/entretiens");
  }; 
 
  const loadEntretiens = async () => {
    const result = await axios.get(`http://localhost:5000/maintenances/getone/${id}`);
    setMaintenances(result.data[0]);
    
  };




 
    return (
        <div style={{ width: 700, margin: "10px auto" }}>
        <form className="grid grid-cols-1 gap-6" onSubmit={e => onSubmit(e)}>
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
            <span className="text-gray-700">Montant</span>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="montant"
              value={montant}
              placeholder="Montant"
              onChange={e=>handleChange(e)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              spellCheck="false"
              name="description"
              value={description}
              onChange={e=>handleChange(e)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Facture</span>
            <input
              type="file"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="facture"
              placeholder="Facture"
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

export default EditEntretien;

