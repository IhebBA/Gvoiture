import React, { useReducer,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCars } from "./api/cars";
import CARS from "./CARS";

function getPreviousDayDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  return currentDate.toISOString().slice(0, 10);
}

const initalState = {
  date: getPreviousDayDate(),
  car_mat: "196TU7741",
  montant: 0,
  description: "",
  
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function NewMaintenance() {

  const [state, dispatch] = useReducer(reducer, initalState);
  let navigate = useNavigate();
  
  const [cars, setcars] = useState([]);

  /*const [selectetdFile, setSelectedFile] = useState([]);
  const [fileBase64String, setFileBase64String] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    console.log(e.target.files[0].size);
    console.log(e.target.files[0].type);
  };

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };*/

  useEffect(() => {

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




  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/maintenances/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      await response.json();
      navigate("/entretiens");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { date, car_mat, montant, description } = state;

 var mat ;

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
          <span className="text-gray-700">Montant</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="montant"
            value={montant}
            placeholder="Montant"
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Facture</span>
          <input
            type="file"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="facture"
            placeholder="Facture"
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

export default NewMaintenance;
