import React, { useEffect, useState } from 'react';
import Item from './Item';
import axios from 'axios';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';


const Todo=(todo)=>{
    console.log("in todo");
    const listtitle=todo.todo.listTitle;
    const boardid=todo.todo.BoardId;
    const todoid=todo.todo.id;
    console.log(listtitle+" "+boardid+" "+todoid);
    const [items,setItems]=useState([]);

    useEffect(()=>{
          axios.get(`http://localhost:3001/items/${boardid}/${todoid}`).then((response)=>{
            setItems(response.data);
          });
        },[]);


    const itemslist=items.map((item,key)=>{
        return(<div key={key}><Item item={item}/></div>);
      });

      const initialValues={
        BoardId:boardid,
        TodoId:todoid,
        itemTitle:"",
        itemText:"",
      };
    
    
      const validationSchema = Yup.object().shape({
        itemTitle: Yup.string().required("You must input a Title!").min(3).max(15),
        itemText: Yup.string().required("You must input content!").min(3).max(45),
    
      });
    
    
      const onSubmit=(data)=>{
       console.log("submit"+data);
       axios.post("http://localhost:3001/items",data)
        .then(()=>{
          const item = { itemTitle:data.itemTitle ,itemText:data.itemText};
          setItems([...items, item]);
        });
      };
    
    
  return (
    <>
     <div>
       <div className='listtitle'>{listtitle}</div>
       <div className='listitems'>{itemslist}</div>
       <div >
     <div className='listform'>
     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
       <Form>
         <Field name="itemTitle" placeholder="itemTitle" id="itemtitle"/>
         <Field name="itemText" placeholder="itemText" id="itemtext"/>
         <button type='submit'>Submit</button>
       </Form>
     </Formik>
     </div>
     </div>
     </div>
    </>
  );
}

export default Todo;