import React from 'react';
import Auth from '../Auth/Auth'
const auth = new Auth();

const EditTrip = (props) =>  {

  return (
    <div>
      <h4> Edit Trip</h4>
      <form onSubmit={props.closeAndEdit}>
        <label>
          Edit Trip:
          <input type="text" name="title" onChange={props.handleFormChange} value={props.tripToEdit.title}/>
        </label>
        <label>
          Edit Description:
          <input type="text" name="description" onChange={props.handleFormChange} value={props.tripToEdit.description}/>
        </label>
        <input type="hidden" id="userId" name="userId" value={props.tripToEdit.userGivenName} />
        <input type='Submit'/>
      </form>
    </div>

    )
  }

export default EditTrip;