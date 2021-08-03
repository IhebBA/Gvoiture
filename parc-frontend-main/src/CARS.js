import React, {  useEffect, useState } from "react";
import { getCars } from "./api/cars";
import { getMissions } from "./api/missions";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";





function CARS() {

  

 // const [state] = useReducer(reducer, initalState);
  const [cars, setcars] = useState([]);
  const [mission,setmission] =  useState([]);

 
  const getM = async ()=>{
    const res = await fetch ('http://127.0.0.1:5000/cars/')
    const d = await res.json();
    setcars(d);
  }


  


  useEffect(() => {

    let ignore = false;

    async function fetchData() {
      const data = await getCars();
      const dataM = await getMissions();
      console.log(data)
      if (!ignore){
        setcars(data);
        setmission(dataM);
      } 

    }

    fetchData();
    //getdistance();
    return () => {
      ignore = true;
    };
  }, []);





  const handleDelete = async (id) => {
    if (window.confirm('Are you sure  ?')){
        const resultat = await fetch('http://127.0.0.1:5000/cars/delete/'+id,{
              method:'DELETE'
          });
          const res = await resultat.json();
          console.log(res);
          await getM();
    }
          
  }

  
  
 
  /*const getdistance = async ()=>{
    const res = await fetch ('http://127.0.0.1:5000/missions/getDistance/196TU7741')
    const d = await res.json();
    console.log(d);
  }*/

 var somme ;
  

  return (
    <div style={{ width: 1200, margin: "10px auto" }}>

           <NavLink to="/nouveau-cars">
            <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">

            Ajouter un voiture 
          </button >
          </NavLink>

      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">matricule</th>
            <th className="px-4 py-2">marque</th>
            <th className="px-4 py-2">modele</th>
            <th className="px-4 py-2">typecars</th>
            <th className="px-4 py-2">energie</th>
            <th className="px-4 py-2">date</th>
            <th className="px-4 py-2">dernière_vidange</th>
            <th className="px-4 py-2">prochain_vidange</th>
            <th className="px-4 py-2">Kilométrage</th>
            <th className="px-4 py-2" colSpan="2">Operations</th>
          </tr>
        </thead>
        <tbody>
        
          {cars.map(
            ({ matricule, marque, modele, type, energie,date,dernière_vidange}) => (
             
              <tr key={matricule}>
                <td className="border px-4 py-2">{matricule}</td>
                <td className="border px-4 py-2">{marque}</td>
                <td className="border px-4 py-2">{modele}</td>
                <td className="border px-4 py-2">{type}</td>
                <td className="border px-4 py-2">{energie}</td>
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2">{dernière_vidange}</td>
                <td className="border px-4 py-2">{dernière_vidange + 10000} km</td>
                {somme = 0 , 
                 mission.map (
                  (obj,index) => {
                         
                      if (obj.matricule == matricule){
                        somme = somme + obj.distance 
                       
                      } 
                  })
                
                }
                
                
                <td className="border px-4 py-2">{somme}</td>
                <td>   <NavLink to={"/EditCars/"+matricule}>
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 " >
                            
                          modifier
                        </button >
                        </NavLink>
                </td>
                <td>
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 "  onClick={()=>handleDelete(matricule)}>
                            
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

export default CARS;
