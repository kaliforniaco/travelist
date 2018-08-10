import React, { Component } from 'react';
import Auth from '../Auth/Auth'
import LocationSearchInput from '../googleMaps/LocationSearchInput'

const auth = new Auth();

class CreateTrip extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      email: auth.getProfile().email,
      googlePlace: '',
    }
  }
  updateTrip = (e) => {

    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });

  }

setFormLocation = (googleLocation) => {

let parsedLoc = googleLocation.split(',')
this.setState({
  googlePlace: parsedLoc[0],
})

}

  render(){
    return(

    <div>



    <LocationSearchInput setFormLocation={this.setFormLocation} />

    <form onSubmit={this.props.addTrip.bind(this, this.state)}>
      <label>
        Trip:
        <input type="text" name="title" onChange={this.updateTrip}/>
      </label>



      <label>
        Description:
        <textarea name="description" onChange={this.updateTrip}/>
      </label>
      <input type="hidden" id="userId" name="userId" value={this.state.email} />
      <input type='Submit'/>
    </form>
</div>
    )
  }
}


export default CreateTrip;





