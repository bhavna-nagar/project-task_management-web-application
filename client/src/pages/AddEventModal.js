import React, { useState } from 'react';
import Datetime from 'react-date-time';
import Modal from "react-modal";

const AddEventModal=({isOpen,onClose,onEventAdded})=>{
  const [eventtitle,setEventtitle]=useState("");
  const [start,setStart]=useState(new Date());
  const [end,setEnd]=useState(new Date());
  
  const onSubmit=(event)=>{
      event.preventDefault();
      onEventAdded({
          eventtitle,
          start,
          end,
      })
      onClose();
  }

  return(<Modal isOpen={isOpen} onRequestClose={onClose}>
         <form onSubmit={onSubmit}>
              <input placeholder='event title' value={eventtitle} onChange={e=>setEventtitle(e.target.value)}/>
              <div>
                  <label>Start Date</label>
                  <Datetime value={start} onChange={(date)=>setStart(date)}/>
              </div>
              <div>
                  <label>End Date</label>
                  <Datetime value={end} onChange={(date)=>setEnd(date)}/>
              </div>
              <button>Add Event</button>
         </form>
    </Modal>);
}

export default AddEventModal;