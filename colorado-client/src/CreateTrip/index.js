import React, { Component } from 'react';
import Auth from '../Auth/Auth'
const auth = new Auth();


class CreateTrip extends Component {
  constructor(){
    super();

    this.state = {
      title: '',
      description: '',
      userGivenName: (auth.getProfile().email)
    }
  }
  updateTrip = (e) => {

    this.setState({[e.currentTarget.name]: e.currentTarget.value});

  }

  render(){
    console.log(this.state.userGivenName, ' this is userGivenName')
  return (
    <form onSubmit={this.props.addTrip.bind(this, this.state)}>
      <label>
        Trip:
        <input type="text" name="title" onChange={this.updateTrip}/>
      </label>



      
      <label>
        Description:
        <textarea name="description" onChange={this.updateTrip}/>
      </label>
      <input type="hidden" id="userId" name="userId" value={this.state.userGivenName} />
      <input type='Submit'/>
    </form>

    )
  }
}


export default CreateTrip;