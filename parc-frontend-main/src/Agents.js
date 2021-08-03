import React, {  useEffect, useState } from "react";
import { getAgents } from "./api/agents";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";





function Agents() {

  

 // const [state] = useReducer(reducer, initalState);
  const [agents, setAgents] = useState([]);
  

 
  const getM = async ()=>{
    const res = await fetch ('http://127.0.0.1:5000/agents/')
    const d = await res.json();
    setAgents(d);
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getAgents();
      console.log(data)
      if (!ignore) setAgents(data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);





  const handleDelete = async (id) => {
    if (window.confirm('Are you sure  ?')){
        const resultat = await fetch('http://127.0.0.1:5000/agents/delete/'+id,{
              method:'DELETE'
          });
          const res = await resultat.json();
          console.log(res);
          await getM();
    }
          
  }


 

 
  

  return (
    <div style={{ width: 1200, margin: "10px auto" }}>

           <NavLink to="/nouveau-agents">
            <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">

            Ajouter un chauffeur 
          </button >
          </NavLink>

      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Numero Cin</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Date d’embauche</th>
            <th className="px-4 py-2" colSpan="2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(
            ({ id,idA, cin, nom,date}) => (
              <tr key={id}>
                <td className="border px-4 py-2">{idA}</td>
                <td className="border px-4 py-2">{cin}</td>
                <td className="border px-4 py-2">{nom}</td>
                <td className="border px-4 py-2">{date}</td>
                <td>   <NavLink to={"/EditAgents/"+id}>
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
      <center>
         
      </center> 
    </div>
  );
}

export default Agents;
