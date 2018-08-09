import React from 'react';
import Auth from '../Auth/Auth'
const auth = new Auth();

const authName = (auth.getProfile().email)


const Trips = (props) => {
  console.log(authName, 'this is authName')
  const tripList = props.trips.map((trip, i ) => {
    console.log(trip._id, ' trip id')
    if (authName === trip.userGivenName) {
      return (


      <li key={trip._id}>
        <h1>{trip.title}</h1><br/>
        <h3>{trip.description}</h3><br/>
        <button onClick={props.deleteTrip.bind(null, trip._id)}>Delete</button>
        <button onClick={props.showModal.bind(null, trip._id)}>Edit</button>
    </li>


      )
    } else {
    return (

      <h1> You are viewing your trips ONLY</h1>

    )}
  })

  return (
    <ul>
      {tripList}
    </ul>
    )

};


export default Trips;