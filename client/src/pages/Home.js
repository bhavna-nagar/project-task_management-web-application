import React from 'react';
import axios from "axios";
import { useEffect, useState,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";


function Home() {

    const {AuthState,setAuthState}=useContext(AuthContext);

    const [listOfBoards,setlistOfBoards]=useState([]);
     useEffect(()=>{
      console.log("home");
       if(AuthState.id!==0){
        
        axios
        .get(`http://localhost:3001/boards/user/${AuthState.id}`)
        .then((response)=>{
         setlistOfBoards(response.data);
          }); 
        }else{
          setlistOfBoards([]);
        }

     },[]);

     let navigate=useNavigate();

  return (
    <div>
        {listOfBoards.map((value,key)=>{
        return(
          <div className='board' onClick={() => navigate(`/board/${value.id}`)}>
            <div className='title'>
              {value.title}
            </div>
            <div className='body'>
              {value.boardText}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Home