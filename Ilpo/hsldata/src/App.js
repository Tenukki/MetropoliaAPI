import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import MapContainer from "./Maps"

const url = "https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
  const  getAll = async () =>{
    let reuest = await axios.get(url)
    console.log(reuest.data)
    return reuest.data
  }

  const getWeather = async (lat,lon) => {
    const weatheUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=114332134ea7ed53cb7a0e88a863eb5d`
    console.log(weatheUrl)
    let reuest = await axios.get(weatheUrl)
    console.log(reuest.data)
    return reuest.data
  }


const Notes = ({data,mapjson,setJsonMap,saa}) =>{
  const [show,setShow] = useState(true)
  const [weather,setWeather] = useState({})


  if(show){
    return(
      <div onClick={async () =>{
        const neww = {x: data.geometry.x, y: data.geometry.y}
        let list = [...mapjson].concat(neww)
        console.log(list)
        setJsonMap(list)
        const we =  await getWeather(data.geometry.y,data.geometry.x)
        setWeather(we)
        saa(we)
        setShow(!show)
      }}>
      <h3>Osoite: {data.attributes.Name}</h3>
      </div>
    )
  }else{
    return(
      <div onClick={() => setShow(!show)}>
      <h3>Osoite: {data.attributes.Name}</h3>
      <p>Saatavilla olevat: {data.attributes.Kapasiteet}</p>
      <p></p>
      <p>{weather.main.temp - 273.15} Celsius</p>
      {console.log(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)}
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="new"/>
      <p>----------------</p>
      </div>
    )
  }


}


function  App() {
  const [json,setJson] = useState([])
  const [mapjson,setJsonMap] = useState([])
  const [saa,setSaa] = useState([])


  useEffect(()=>{
    const pro =async () =>{
      const dat = await getAll()
      setJson(dat.features)
      console.log(dat.features)
    }
    pro()
  },[])

  const bikes = json.map((data) => 
    <Notes saa={setSaa} key={data.attributes.ID} data={data} mapjson={mapjson }setJsonMap={setJsonMap}/>
  )

  return (
    <div >
      <div style={{width: "100%"}}>
      <MapContainer json={mapjson}/>
      </div>
      <div style={{paddingTop: "50%"}}>
      <h1>Pyörät</h1>
      <p>Klikkaa alapuolella olevia osotteita</p>
      {bikes}
      </div>
      
    </div>
  );
}

export default App;
