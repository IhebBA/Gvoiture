const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:null,
			
		},
		actions: {
			

			login: async (email,motpass)=> {
				const opts = {
					method:"POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body:JSON.stringify({
						"email":email,
						"motpass":motpass
					})
				  }
				  try{
					  const res = await fetch('http://127.0.0.1:5000/login/token',opts)
					  if (res.status !==200){
						alert("adresse e-mail ou mot de passe incorrect");
						return false;
					  }
					  
					  const data = await res.json();
					  console.log("this came from the backend",data);
					  sessionStorage.setItem("token",data.access_token);
					  setStore({token: data.access_token});
					  return true;
				  
				     }
				  catch(error){
					console.log("error")
				  }
			},

			
			
		}
	};
};

export default getState;