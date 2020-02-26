import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { useEffect, useState,Component } from 'react';
import axios from "axios"
/*
x: 24.950292890004903
y: 60.15544479374228
*/
export class MapContainer extends Component {

    render() {
      return (
        <Map google={this.props.google} zoom={11} 
        initialCenter={{
            lat: 60.15544479374228,
            lng: 24.950292890004903
          }}
        >
            {this.props.json.map((data)=>
                <Marker position={{lat:data.y , lng: data.x}} />
            )}
          
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: "AIzaSyBW9wBn9C2sbLOh7dg6Qm_9bl0epEer-JU"
  })(MapContainer)