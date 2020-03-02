import React, { useEffect, useState,Component } from 'react';
import axios from "axios"
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Routing from "./Routing"
/*
x: 24.950292890004903
y: 60.15544479374228
*/

const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props}/>
}
  
  
  class MapContainer extends React.Component {
    
    getWeather = async (lat,lon) => {
      const weatheUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=114332134ea7ed53cb7a0e88a863eb5d`
      console.log(weatheUrl)
      let reuest = await axios.get(weatheUrl)
      console.log(reuest.data)
      return reuest.data
    }

    constructor(props) {
      super(props);
      this.state = {
        currentPos: null,
        isMapInit: false
      };
      this.handleClick = this.handleClick.bind(this);
    }

    
    saveMap = map => {
      this.map = map;
      this.setState({
        isMapInit: true
      });
    };

    position = [51.505, -0.09]


    handleClick(e){
      this.setState({ currentPos: e.latlng });
    }

    render (){
      return(
      <Map center={[60.15544479374228,24.950292890004903]} zoom={10} ref={this.saveMap}  onClick={this.handleClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        
        />
        {console.log(this.props.json)}
        {this.props.json.map((data)=>
                 <Marker position={[data.y ,data.x]}>
                 <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
               </Marker>
            )}

{ this.state.currentPos && <MyMarker position={this.state.currentPos}>
            <Popup position={this.state.currentPos}>
              Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </MyMarker>}

      {this.props.json.length >= 2  && <Routing map={this.map} info={this.props.json}/>}
      </Map>
      )
    }
  }
 
 
   
export default MapContainer
