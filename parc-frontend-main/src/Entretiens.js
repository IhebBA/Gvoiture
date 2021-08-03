import React, { useEffect, useState } from "react";
import { getMaintenances } from "./api/maintenances";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

function Rapport() {
  const [maintenances, setMaintenances] = useState([]);

  const getentretien = async ()=>{
    const res = await fetch ('http://127.0.0.1:5000/maintenances/')
    const d = await res.json();
    setMaintenances(d);
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getMaintenances();
      console.log(data);

      if (!ignore) setMaintenances(data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure  ?')){
        const resultat = await fetch('http://127.0.0.1:5000/maintenances/delete/'+id,{
              method:'DELETE'
          });
          const res = await resultat.json();
          console.log(res);
          await getentretien();
    }
          
  }

  return (
    <div style={{ width: 1200, margin: "10px auto" }}>

     
       <NavLink
                    to="/nouveau-entretien"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    activeClassName="text-red-700"
                    
                  >
                    Nouveau Entretien
         </NavLink>
      


      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Voiture</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Montant</th>
            <th className="px-4 py-2">Piéce jointe</th>
            <th className="px-4 py-2" colSpan="2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map(({ id, car_mat, description, montant, date,facture }) => (
            <tr key={id}>
              <td className="border px-4 py-2">
                {format(new Date(date), "dd/MM/yyyy")}
              </td>
              <td className="border px-4 py-2">{car_mat}</td>
              <td className="border px-4 py-2">{description}</td>
              <td className="border px-4 py-2">{montant}</td>
              <td className="border px-4 py-2">{facture}</td>
              <td>      
                      <NavLink to={"/EditEntretien/"+id} >
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 " >
                            
                          modifier
                        </button >

                      </NavLink>
                       
                </td>
                <td>
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 " onClick={()=>handleDelete(id)}>
                            
                           supprimer
                        </button >
                    
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
    </div>
  );
}

export default Rapport;
