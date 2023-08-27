import { divIcon} from "leaflet";
import React from "react";
import {MapContainer ,Marker,Popup,TileLayer} from 'react-leaflet';

const markerIcon =divIcon({className: 'marker-icon', iconSize: [15, 15]})

function MapView(props) {

  const { locationArray } = props;


  const markerElement =  (
    locationArray.map(location=> {
    
      const{
        locID,
        projectionlat,projectionlon
        ,speed

        // ip,city,
        // country_name,
        // latitude,longitude
      } = location ;
      console.log(location)
      // let title =`${country_name} ${city}`
      let title=`${speed}`
      
      return(
         <Marker key={`${locID}`} position={[projectionlat,projectionlon]} icon={markerIcon} > 
          <Popup>{title}</Popup>
        </Marker>
        // <Marker key={`${ip}`} position={[latitude,longitude]} icon={markerIcon} > 
        //   <Popup>{title}</Popup>
        // </Marker>
      )
    })
  )

  return (
        <MapContainer className="map-view" center={[13.7, 100.4]} zoom={10} scrollWheelZoom={true}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // normal
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                // url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" //white
            />
            {markerElement}
    </MapContainer>
  );
}

export default MapView;
