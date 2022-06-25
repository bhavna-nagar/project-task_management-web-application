import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Todo from './Todo';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";




function Board() {
  let {id}=useParams();
  const [boardObject,setBoardObject]=useState({});
  const [todos,setTodos]=useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:3001/boards/byId/${id}`).then((response)=>{
       setBoardObject(response.data);
      });
      
      axios.get(`http://localhost:3001/todos/${id}`).then((response)=>{
        setTodos(response.data);
      });
    },[]);
     
   const todolists=todos.map((todo,key)=>{
     return(<div key={key} className='lists'><Todo todo={todo}/></div>);
   })

   const initialValues={
    listTitle:"",
    BoardId:id
  };


  const validationSchema = Yup.object().shape({
    listTitle: Yup.string().required("You must input a Title!").min(3).max(15),

  });



  const onSubmit=(data)=>{
   axios.post("http://localhost:3001/todos",data)
    .then(()=>{
      const todo = { listTitle:data.listTitle };
      setTodos([...todos, todo]);
      window.location.reload();
    });
  };


  console.log(todos);  

  return (
  <>
  <div className='container'>
   <div className='container1'>
     <div className='heading'>
        {boardObject.title}
     </div>
     <div className='text'>
        {boardObject.boardText}
     </div>
   </div>
   <div className='container2'>
     <div className='container3'>{todolists}</div>
   </div>
   <div className='container4'>
     <div className='form'>
     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
       <Form>
         <Field name="listTitle" placeholder="listTitle" id="createlist"/>
         <button type='submit'>Submit</button>
       </Form>
     </Formik>
     </div>
     </div>
   </div>
   </>
  )
}

export default Board;