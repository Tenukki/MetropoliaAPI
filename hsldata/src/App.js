import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import MapContainer from "./Maps"

const url = "https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
  const  getAll = async () =>{
    let reuest = await axios.get(url)
    console.log(reuest.data)
    return reuest.data
  }



const Notes = ({data,mapjson,setJsonMap}) =>{

  const [show,setShow] = useState(true)
  console.log(data)
  if(show){
    return(
      <div onClick={() =>{
        const neww = {x: data.geometry.x, y: data.geometry.y}
        let list = [...mapjson].concat(neww)
        console.log(list)
        setJsonMap(list)
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
      <p>----------------</p>
      </div>
    )
  }


}


function  App() {
  const [json,setJson] = useState([])
  const [mapjson,setJsonMap] = useState([])

  useEffect(()=>{
    const pro =async () =>{
      const dat = await getAll()
      setJson(dat.features)
      console.log(dat.features)
    }
    pro()
  },[])

  const bikes = json.map((data) => 
    <Notes data={data} mapjson={mapjson }setJsonMap={setJsonMap}/>
  )

   
 

  return (
    <div >
      <MapContainer json={mapjson}/>
      <h1>Pyörät</h1>
      <p>Klikkaa alapuolella olevia osotteita</p>
      {bikes}
    </div>
  );
}

export default App;
