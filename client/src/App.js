import './App.css';
import {BrowserRouter as Router,Route,Routes,Link, useNavigate} from 'react-router-dom'; 
import Home from './pages/Home';
import CreateBoard from './pages/CreateBoard';
import Board from './pages/Board';
import Calender from './pages/Calender';
import Modal from 'react-modal';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {AuthContext} from './helpers/AuthContext';
import { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

Modal.setAppElement('#root');


function App() {


  const [AuthState,setAuthState]=useState({
    username:"",
    id:0,
    status:false
  });


  useEffect(()=>{
    //if(localStorage.getItem("accessToken")){setAuthState(true);}
    axios.get("http://localhost:3001/auth/auth",{headers:{accessToken:localStorage.getItem("accessToken")}})
      .then((response)=>{
      if(response.data.error){
        setAuthState({ ...AuthState,status:false });
      }
      else{ setAuthState({
        username:response.data.username,
        id:response.data.id,
        status:true
      });
      console.log(response.data.id);
    }
    })
},[])


const logout=()=>{
  localStorage.removeItem('accessToken');
  setAuthState({ username:"",
    id:0,
    status:false});
}

  return (
    <div className="App">
      <AuthContext.Provider value={{AuthState,setAuthState}}>
      <Router>
        <div className='navbar'>
        {!AuthState.status?(
        <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        </>):(
          <div>
          <Link to="/createboard">Create a Board</Link>
          <Link to="/home">go to HomePage</Link>
          <Link to="/calender">Calender</Link>
          <button onClick={logout}>LogOut</button>
          </div>
        )
        }
        
        <h1>{AuthState.username}</h1>
        </div>
        <Routes>
          <Route path="/home" exact  element={<Home />}/>
          <Route path="/createboard" exact element={<CreateBoard/>}/>
          <Route path="/board/:id"  element={<Board/>}/>
          <Route path="/calender" exact element={<Calender/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="*" component={Error} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
