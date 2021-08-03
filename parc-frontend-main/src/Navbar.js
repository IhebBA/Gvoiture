import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./grt-logo.png";
import { useNavigate  } from "react-router-dom";



function Navbar() {

  let navigate = useNavigate();

 function logout(){
 
    localStorage.clear();
   // navigate("/");
   window.location.href = '/';
 }

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 border-b-2 border-gray-200">
      <div className="flex items-center flex-shrink-0 text-white mr-4">
        <img className="h-12" src={logo} alt="GRT Logo" />
      </div>
      <div className="block lg:hidden ">
        <button className="flex items-center px-3 py-2 border rounded">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-red-700"
            activeClassName="text-red-700"
            end
          >
            Rapports
          </NavLink>
          <NavLink
            to="/rapports"
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-red-700"
            activeClassName="text-red-700"

          >
            Missions
          </NavLink>
          <NavLink
            to="/entretiens"
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-red-700"
            activeClassName="text-red-700"
          >
            Entretiens
          </NavLink>
          
          <NavLink
            to="/agents"
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-red-700"
            activeClassName="text-red-700"
          >
            Chauffeurs
          </NavLink>

          <NavLink
            to="/Cars"
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-red-700"
            activeClassName="text-red-700"
          >
            Voitures
          </NavLink>
        
          <NavLink
            to="#"
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-red-700"
            activeClassName="text-red-700"
            onClick={logout} 
            style={{color:'blue'}}
          >
            LOGOUT
          </NavLink>
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
