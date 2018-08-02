import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="google_map_wrapper" role="main">
        <a className="menu" tabIndex="0">
          <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
          </svg>
        </a>
        <h1 className="heading" role="title"> Google Maps API for Schorndorf, Germany </h1>
       <MapContainer/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_LcpUPuujAGSgvZ8hm-RpM8VsuGmCmOk'
})(App)
