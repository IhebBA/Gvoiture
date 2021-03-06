import React, {  useContext, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  
   async function loginUser(credentials) {

    const res ='http://127.0.0.1:5000/login/signin'; 

    return fetch(res, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(resp=>{
        if(resp.status !==200){
          alert("email ou mot de passe incorrect");
        }
        else{
          return resp.json();
        }
        
      })
      

      
   }

   
function Login({ setToken }) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motpass, setMotpass] = useState("");


const classes = useStyles();
 
const handelClick = async e => {
  e.preventDefault();
  const token = await loginUser({
    email,
    motpass
  });
  setToken(token);
}
  return (
    
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5"> 
        Sign in
      </Typography>
      
      
          <form className={classes.form} noValidate>
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={motpass}
          onChange={(e)=>setMotpass(e.target.value)}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handelClick}
        >
          Sign In
        </Button>
        </form>
        
    </div>
  </Container>
      );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;