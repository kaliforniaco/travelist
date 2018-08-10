
import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import SearchBar from 'SearchBar'

export class MapContainer extends Component {
  constructor(props){
  super(props);
  render() {

    // let quakeMarkers = this.props.quakesData.map( ( quake, index ) =>
    //   (
    //     <Marker
    //       key={index}
    //       title={quake.properties.place}
    //       name={quake.properties.place}
    //       position={{
    //         lat: quake.geometry.coordinates[1],
    //         lng: quake.geometry.coordinates[0]
    //       }}
    //     />
    //   )
    // )

    return (
      <div className="mapContainer">
	      <Map
	        google={...this.props.google}
	        initialCenter={{
		        lat: {props.google.latitude} || 39.7392358,
		        lng: {props.google.longitude} || -104.990251
	      }}
	      style={{
	      	width: '50%',
	      	//height: '80%'
	      }}

	      zoom={7}
	      
	      onClick={this.onMapClicked}>

      			{}

          

     	 </Map>
      </div>
    );
  }
  }
}

window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBZ085JAQDlqT_OTqn7dp8_yD7LLBHwwJQ')

})(MapContainer)
