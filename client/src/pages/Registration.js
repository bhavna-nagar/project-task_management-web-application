import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
    const initialValues={
        username:"",
        password:"",
        email:""
      };

      const validationSchema = Yup.object().shape({
        username: Yup.string().required("You must input a Title!").min(3).max(15),
        password: Yup.string().required("you must input body!").min(6).max(20),
        email:Yup.string().required("you must input body!")
      });

      const navigate=useNavigate();

      const onSubmit=(data)=>{
        axios.post("http://localhost:3001/auth",data)
        .then(()=>{
              navigate("/");
        });}

  return (
    <>
    <div className='createboardpage'>
    <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    <Form className='formcontainer'>
      <label>username:</label>
      <ErrorMessage name="username" component="span"/>
      <Field
         name="username"
         placeholder="username"
         id="inputcreateboard"
      />
      <label>password:</label>
      <ErrorMessage name="password" component="span"/>
      <Field
         name="password"
         placeholder="password"
         type="password"
         id="inputcreateboard"
      />
      <label>email:</label>
      <ErrorMessage name="email" component="span"/>
      <Field
         name="email"
         placeholder="email"
         id="inputcreateboard"
      />
      <button type='submit'>Submit</button>
    </Form>
 </Formik>
  </div>
  </>
  );
}
export default Registration;