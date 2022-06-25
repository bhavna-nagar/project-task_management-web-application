import React, { useState ,useRef,useContext} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment';
import AddEventModal from "./AddEventModal";
import axios from 'axios';
import {AuthContext} from "../helpers/AuthContext";


function Calender() {
    const {AuthState,setAuthState}=useContext(AuthContext);
    const [modelOpen,setModelOpen]=useState(false);
    const [events,setEvents]=useState([]);
    const calenderRef=useRef(null);

    const onEventAdded=(event)=>{
        let calendarApi = calenderRef.current.getApi()
        const eventtoadd={
          start:moment(event.start).toDate(),
          end:moment(event.end).toDate(),
          title:event.eventtitle
       };
        calendarApi.addEvent(eventtoadd);
        axios.post("http://localhost:3001/events",{...eventtoadd,UserId:AuthState.id})
        .then(()=>{
         });
    };

  /*const handleEventAdd=(data)=>{
     
     axios.post("http://localhost:3001/events",{...data.event,UserId:AuthState.id}).then(()=>{
     });
  } eventAdd={(event)=>handleEventAdd(event)}*/

    async function handleEventsSet(data){
      console.log(AuthState.id+"add");
    const response= await axios.get(`http://localhost:3001/events/user/${AuthState.id}`);
    console.log(response.data);
    setEvents(response.data);
  } 

  return (
    <section>
        <button onClick={()=>setModelOpen(true)}>Add Event</button>
        <div style={{position:"relative",zIndex:0}} className='calender' >
        <FullCalendar
        events={events}
        ref={calenderRef}
        plugins={[dayGridPlugin ]}
        initialView="dayGridMonth"
        selectable={true}
        eventsSet={(date)=>handleEventsSet(date)}
       />
      </div>
      <AddEventModal isOpen={modelOpen} onClose={()=>setModelOpen(false)} 
          onEventAdded={event=>onEventAdded(event)}/>
    </section>
  )
}

export default Calender;