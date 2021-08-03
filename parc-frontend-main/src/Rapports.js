import React, {  useEffect, useState } from "react";
import { getMissions } from "./api/missions";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";





function Rapports() {

  

 // const [state] = useReducer(reducer, initalState);
  const [missions, setMissions] = useState([]);
  

  /*const [nom, setNom] = useState('');
  const [distance, setDistance] = useState('');
  const [chauffeur_id, setChauffeur] = useState('');
  const [carburant, setCarburant] = useState('');
  const [car_mat, setCarMat] = useState('');
  const [date, setDate] = useState('');  */

// get Missions  
const getM = async ()=>{
    const res = await fetch ('http://127.0.0.1:5000/missions/')
    const d = await res.json();
    setMissions(d);
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getMissions();
      console.log(data)
      if (!ignore) setMissions(data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);





  const handleDelete = async (id) => {
    if (window.confirm('Are you sure  ?')){
        const resultat = await fetch('http://127.0.0.1:5000/missions/delete/'+id,{
              method:'DELETE'
          });
          const res = await resultat.json();
          console.log(res);
          await getM();
    }
          
  }

 
 

 
  

  return (
    <div style={{ width: 1200, margin: "10px auto" }}>

      
          <NavLink to="/nouvelle-mission">
            <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">

            Ajouter une mission
          </button >
          </NavLink>
      

      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Mission</th>
            <th className="px-4 py-2">Voiture</th>
            <th className="px-4 py-2">Chauffeur</th>
            <th className="px-4 py-2">Distance en Km</th>
            <th className="px-4 py-2">Carburant</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2" colSpan="2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {missions.map(
            ({ id, nom, matricule, chauffeur, distance, carburant, date }) => (
              <tr key={id}>
              
                <td className="border px-4 py-2">{nom}</td>
                <td className="border px-4 py-2">{matricule}</td>
                <td className="border px-4 py-2">{chauffeur}</td>
                <td className="border px-4 py-2">{distance}</td>
                <td className="border px-4 py-2">{carburant}</td>
                <td className="border px-4 py-2">
                  {format(new Date(date), "dd/MM/yyyy")}
                </td>
                <td>   <NavLink to={"/EditMission/"+id} >
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 " >
                            
                          modifier
                        </button >
                        </NavLink>
                </td>
                <td>
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 "  onClick={()=>handleDelete(id)}>
                            
                           supprimer
                        </button >
                    
                </td>
              </tr>
            )
          )}
            
        </tbody>
      </table>
       
    </div>
  );
}

export default Rapports;
