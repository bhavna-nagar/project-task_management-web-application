import React,{useContext} from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";


function CreateBoard() {
  const {AuthState,setAuthState}=useContext(AuthContext);
  const initialValues={
    title:"",
    boardText:"",
    UserId:AuthState.id
  };

  let navigate=useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!").min(3).max(15),
    boardText: Yup.string().required("you must input body!")
  });

  const onSubmit=(data)=>{
    axios.post("http://localhost:3001/boards",data/*,
    {headers:{accessToken:localStorage.getItem("accessToken")}}*/)
    .then(()=>{
          navigate("/home");
    });
  };

  return (
    <div className='createboardpage'>
       <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className='formcontainer'>
            <label>Title:</label>
            <ErrorMessage name="title" component="span"/>
            <Field
               name="title"
               placeholder="title"
               id="inputcreateboard"
            />
            <label>description:</label>
            <ErrorMessage name="boardText" component="span"/>
            <Field
               name="boardText"
               placeholder="description"
               id="inputcreateboard"
            />
            <button type='submit'>Submit</button>
          </Form>
       </Formik>
    </div>
  );
}

export default CreateBoard