import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import MapContainer from './MapContainer'


document.addEventListener("DOMContentLoaded", function(e) {
  let scriptTag = document.getElementsByTagName('SCRIPT').item(1);
  scriptTag.onerror = function(e) {
    console.log('Ops! We cant access Google Maps API for now! Please try again later!')
    let mapContainerElemt = document.querySelector('#root');
    let erroElement = document.createElement('div');
    erroElement.innerHTML = '<div class="error-msg">Ops! We cant access Google Maps API for now! Please try again later!</div>'
    mapContainerElemt.appendChild(erroElement)
  }
})

class App extends Component {


  render() {
    return (
      <main className="google_map_wrapper" role="main">
        <section className="menu" tabIndex="0">
          <div id="sidebarToogle">
            <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </div>
          <h1 className="heading" > Google Maps API for Schorndorf, Germany </h1>
        </section>

        <MapContainer google={this.props.google}/>
      </main>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_LcpUPuujAGSgvZ8hm-RpM8VsuGmCmOk'
})(App)
