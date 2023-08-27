import React, { useEffect, useState } from "react";
import MapView from "../components/displayRoute/MapView";
import "leaflet/dist/leaflet.css"
import '../Css/App.scss'
import Axios from 'axios';
import LiveView from "../components/displayRoute/Liveview";

// const api ="https://ipapi.co/json"
const mainapi ="https://itictestapp.rama4model.in.th/v1/"
// const api = 'https://itictestapp.rama4model.in.th/v1/mayi2ZJPSl2IA6N3Era5pPY1reA'

function Route() {
  const [locationArray, setLocationArray] = useState([]);
  const[listOfCar,setListOfCar] = useState([]);
  // const[interestCar,setInterestcar] = useState('');


  useEffect(()=>{
    Axios.get(mainapi).then(response =>{
      // setLocationArray([response.data]);
      setListOfCar(response.data.data);
    }).catch(error=>{
      console.log(error);
    })
  },[]);

  console.log(listOfCar)

  return (
    <div className="App">
      <LiveView />
      <MapView locationArray={locationArray} />
    </div>
  );
}

export default Route;