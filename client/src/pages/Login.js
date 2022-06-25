import React, { useContext, useEffect } from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../helpers/AuthContext";

function Login() {
   const {setAuthState}=useContext(AuthContext);

    const initialValues={
        username:"",
        password:"",
      };

      const navigate=useNavigate();
      const onSubmit=(data)=>{
        console.log(data);
        axios.post("http://localhost:3001/auth/login",data)
        .then((response)=>{
              if(response.data.error){
                alert(response.data.error);
                
              }else{
              localStorage.setItem("accessToken",response.data.accessToken);
              setAuthState({username:response.data.username,
                            id:response.data.id,
                            status:true});
              navigate("/");
              }
        });}


  return (
    <div className='createboardpage'>
    <Formik  initialValues={initialValues} onSubmit={onSubmit} >
    <Form className='formcontainer'>
      <label>username:</label>
      <Field
         name="username"
         placeholder="username"
         id="inputcreateboard"
      />
      <label>password:</label>
      <Field
         name="password"
         placeholder="password"
         type="password"
         id="inputcreateboard"
      />
      <button type='submit'>Submit</button>
    </Form>
 </Formik>
  </div>
  )
}

export default Login