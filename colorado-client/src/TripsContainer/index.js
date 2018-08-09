import React, { Component } from 'react';
import Trips from '../Trips';
import CreateTrip from '../CreateTrip';
import EditTrip from '../EditTrip';
import Auth from '../Auth/Auth'

const auth = new Auth();
const authName = (auth.getProfile().family_name + auth.getProfile().given_name)

class TripContainer extends Component {
  constructor(){
    super();

    this.state = {
      trips: [],
      showEdit: false,
      editTripId: null,
      tripToEdit: {
        title: '',
        lat: '',
        long: '',
        description: '',
        userGivenName: ''
      }
    }
  }
  componentDidMount(){
    this.getTrips().then((trips) => {
      this.setState({trips: trips.data})
    }).catch((err) => {
      console.log(err);
    })
  }


///////////////////    WORKING BUT WRONG    ///////////////////////////////
    getTrips = async () => {

  const trips = await fetch('http://localhost:9000/api/v1/trips');
    const tripsJson = await trips.json();
    return tripsJson

  }
/////////////////////    NOT WORKING BUT RIGHT //////////////////////////////
//     getTrips = async () => {
//
//     const given = auth.getProfile().given_name
//     const trips = await fetch('http://localhost:9000/api/v1/trips');
//
//     const tripsJson = await trips.json();
//     console.log(tripsJson.data, 'before the MAP and cors')
//     const userTrips = await tripsJson.data.map((trip) => {
//       if(trip.userGivenName === authName) {
//        console.log(trips, 'trips IN MAP')
//         return trips
//       }
//       console.log(userTrips)
//    })
//     return userTrips
//    console.log(userTrips, 'after the MAP')

  // }
////////////////////////////////////////////////////////////////////////////////////////////////////

  addTrip = async (trip, e) => {
    //e.preventDefault();
    try {
        const createdTrip = await fetch('http://localhost:9000/api/v1/trips', {
          method: 'POST',
          body: JSON.stringify(trip),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        const createdTripJson = await createdTrip.json();
        this.setState({trips: [...this.state.trips, createdTripJson.data]});

    } catch(err) {
      console.log(err)
    }


  }
  deleteTrip = async (id, e) => {
    console.log(id, ' this is id')
    //e.preventDefault();
    try {
        const deleteTrip = await fetch('http://localhost:9000/api/v1/trips/' + id, {
          method: 'DELETE'
        });
        console.log('inside try')
        const deleteTripJson = await deleteTrip.json();
        this.setState({trips: this.state.trips.filter((trip, i) => trip._id !== id)});

    } catch(err) {
      console.log(err, ' error')
    }


  }
  showModal = (id, e) => {
    // i comes before e, when called with bind
    const tripToEdit = this.state.trips.find((trip) => trip._id === id)
    console.log(tripToEdit, ' tripToEdit')
    this.setState({
                  showEdit: true,
                  editTripId: id,
                  tripToEdit: tripToEdit
                  });
  }
  closeAndEdit = async (e) => {
    //e.preventDefault();

    try {
      const editResponse = await fetch('http://localhost:9000/api/v1/trips/' + this.state.editTripId, {
        method: 'PUT',
        body: JSON.stringify(this.state.tripToEdit),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      const editResponseJson = await editResponse.json();

      const editedTripArray = this.state.trips.map((trip) => {

              if(trip._id === this.state.editTripId){

                trip.title = editResponseJson.data.title;
                trip.description = editResponseJson.data.description;
              }

              return trip
      });

       this.setState({
        trip: editedTripArray,
        showEdit: false
       });



    } catch(err) {
      console.log(err);
    }

  }
  handleFormChange = (e) => {

    this.setState({
      tripToEdit: {
        ...this.state.tripToEdit,
        [e.target.name]: e.target.value
      }
    })
  }
  render(){
    console.log(this.state,authName)
    return (
      <div>
        <Trips trips={this.state.trips} deleteTrip={this.deleteTrip} showModal={this.showModal}/>
        <CreateTrip addTrip={this.addTrip}/>
        {this.state.showEdit ? <EditTrip closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} tripToEdit={this.state.tripToEdit}/> : null}

      </div>
      )
  }
}

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js" integrity="sha384-pjaaA8dDz/5BgdFUPX6M/9SUZv4d12SUPF0axWc+VRZkx5xU3daN+lYb49+Ax+Tl" crossorigin="anonymous"></script>
export default TripContainer;