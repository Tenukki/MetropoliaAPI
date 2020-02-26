import React, {useState,useEffect} from 'react';
import Connect from "./connect"

function App() {

  const [events, setEvents] = useState([])
  const [eventsDate, setEventsDate] = useState([])

  const [eventName, setEventsName] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const [name,setName] = useState("")


  const loadAll =  async () =>{
    const newEvents = await Connect.getAll()
    setEvents(newEvents)
  }

  const postNewEvent = async () =>{
    const newEvent = await Connect.create({event: eventName, location: location, date: date})
    console.log(newEvent)
  }

  const dates = async () =>{
    const newEvent = await Connect.findDate({start,end})
    setEventsDate(newEvent)
    console.log(eventsDate)
  }

  const getByName = async () => {
    const newNames = await Connect.findName(name)
    setEvents(newNames)
    console.log(events)
  }

  const dateObject = eventsDate.map((value) =>
    <div key={value.event}>
      <p>{value.event}</p>
      <p>{value.location}</p>
      <p>{value.date}</p>
      <p>-------------</p>
    </div>
  )

  

  return (
    
    <div>
      <h4>Luo uusi tapahtuma</h4>
      
        <label>
          event
          <input type="text" name="name" onChange={({target}) => setEventsName(target.value)}/>
        </label>
        <br/>
        <label>
          location
          <input type="text" name="name" onChange={({target}) => setLocation(target.value)}/>
        </label>
        <br/>
        <label>
          date (mm/dd/yyyy)
          <input type="text" name="name" onChange={({target}) => setDate(target.value)}/>
        </label>
        <br/>
        <button onClick={postNewEvent}>send</button>

        <h4>Etsi tapahtumia aikavälillä anna formaatissa mm/dd/yyyy</h4>
        <label>
          alkamisajankohta
          <input type="text" name="name" onChange={({target}) => setStart(target.value)}/>
        </label>
        <label>
          loppumisajankohta
          <input type="text" name="name" onChange={({target}) => setEnd(target.value)}/>
        </label>

        {dateObject}

        <button onClick={dates}>send</button>

        <h4>Etsi tapahtuma nimen perusteella</h4>
        <label>
          nimi
          <input type="text" name="name" onChange={({target}) => setName(target.value)}/>
        </label>
        <p> Name: {events.event}</p>
        <p> location: {events.location}</p>
        <p> date: {events.date}</p>
          
        <button onClick={getByName}>send</button>
      
    </div>
    
    
  );
}

export default App;
