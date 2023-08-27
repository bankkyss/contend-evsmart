import React from 'react';

function UploadView({ clearPolylinePoints, removeLastPolylinePoint ,routeName,routeCompany,setRouteCompany,setRouteName,handleSubmit}) {
  return (
    <div className="list-view">
    <div className='input-list-view'>
        <h1> Route Detail</h1>
        <label>Route Name : </label>
        <input
          type="text"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
      </div>
      <div className='input-list-view'>
        <label>Route Company : </label>
        <input
          type="text"
          value={routeCompany}
          onChange={(e) => setRouteCompany(e.target.value)}
        />
      </div>
      <div className='button-polygon'>
        <div className='columns-buttom'>
            <button onClick={clearPolylinePoints}>Clear Polyline</button>
        </div>
        <div className='columns-buttom'>
            <button onClick={removeLastPolylinePoint}>Remove Last Point</button>
        </div>
      </div>
      <div className="div-submit-button">
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default UploadView;