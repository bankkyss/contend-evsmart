import React from 'react';
import MapWithClick from '../components/MapWithClick/MapWithClick';
import UploadView from '../components/MapWithClick/Uploadview';
import axios from 'axios';

function Freeform() {
  
  const [polylinePoints, setPolylinePoints] = React.useState([]);
  const [routeName, setRouteName] = React.useState('');
  const [routeCompany, setRouteCompany] = React.useState('');
  const clearPolylinePoints = () => {
    setPolylinePoints([]);
  };

  const removeLastPolylinePoint = () => {
    if (polylinePoints.length > 0) {
      setPolylinePoints((prevPoints) => prevPoints.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    // Create a data object with the routeName and routeCompany
    const data = {
      routeName,
      routeCompany,
    };

    // Make a POST request to the API endpoint
    axios.post('YOUR_API_ENDPOINT_URL', data)
      .then(response => {
        console.log('Success:', response.data);
        window.alert('Data submitted successfully.');
      })
      .catch(error => {
        console.error('Error:', error);
        window.alert('An error occurred while submitting the data.');
      });
  };

  return (
    <div className="home">
      <UploadView
       clearPolylinePoints={clearPolylinePoints}
       removeLastPolylinePoint={removeLastPolylinePoint}
       routeName={routeName}
       routeCompany={routeCompany}
       setRouteCompany={setRouteCompany}
       setRouteName={setRouteName}
       handleSubmit={handleSubmit}
       />
      <MapWithClick polylinePoints={polylinePoints} setPolylinePoints={setPolylinePoints} />
    </div>
  );
}

export default Freeform;