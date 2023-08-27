import React, { useState, useEffect } from 'react';
import './route.css'
const defaultData = [
    { id: 1, name: 'chula' },
    { id: 2, name: 'thammasat' },
    { id: 3, name: 'kaset' },
  ];


function LiveView() {
  const [data, setData] = useState(defaultData); 
  const [selectedOption, setSelectedOption] = useState(''); 

  useEffect(() => {
    // Fetch data from API here
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('your-api-endpoint');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="list-view">

      <div className='select-list-view'>
        <label>select Company :</label>
        <select classNamePrefix="custom-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an Company</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className='select-list-view'>
        <h2>route</h2>
        {selectedOption && (
        <div className="card">
          <h3>Selected Company</h3>
          <p>Name: {data.find(item => item.id === parseInt(selectedOption)).name}</p>
          <div className="color-preview" style={{ backgroundColor: data.find(item => item.id === parseInt(selectedOption)).color }}></div>
        </div>
      )}
      </div>

    </div>
  );
}

export default LiveView;