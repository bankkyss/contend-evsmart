import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
});
const icon_R = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Red marker icon
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});


function MyComponent({ setPolylinePoints }) {
  const [position, setPosition] = React.useState(null);

  const handleLocationFound = (location) => {
    console.log('Location found:', location.latlng);
    setPosition([location.latlng.lat, location.latlng.lng]);
    const newPoint = [location.latlng.lat, location.latlng.lng];
    setPolylinePoints((prevPoints) => [...prevPoints, newPoint]);
  };

  useMapEvents({
    click: (e) => {
      handleLocationFound(e);
    },
  });

  React.useEffect(() => {
    console.log('position:', position);
  }, [position]);
  return null
  // return position === null ? null : (
  //   <Marker position={position} icon={ icon }>
  //   </Marker>
  // );
}





function MapWithClick({ polylinePoints, setPolylinePoints }) {

  // const [polylinePoints, setPolylinePoints] = React.useState([]);

  return (
    <MapContainer className="map-view"
      center={{ lat: 13.73038, lng: 100.5419}}
      zoom={6}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=046c5e7b-674b-43a0-bc50-06f386efd154"
      />
      {polylinePoints.length > 0 && (
        <>
        <Marker position={polylinePoints[0]} icon={icon_R}>
          <Popup>First Point</Popup>
        </Marker>
        <Marker position={polylinePoints[polylinePoints.length - 1]} icon={icon}>
          <Popup>Last Point</Popup>
        </Marker>
      </>
      )}

      <Polyline positions={polylinePoints} color="blue" />
      <MyComponent setPolylinePoints={setPolylinePoints} />
    </MapContainer>
  );
}

export default MapWithClick;
