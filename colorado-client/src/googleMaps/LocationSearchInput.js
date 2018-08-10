import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchInput


// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { address: 'San Francisco, CA' }
//     this.onChange = (address) => this.setState({ address })
//   }
 
//   handleFormSubmit = (event) => {
//     event.preventDefault()
 
//     geocodeByAddress(this.state.address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error))
//   }
// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//      address: '',
//      latlng: [],
//       }
//   }

//   handleChange = (address) => {
//     this.setState({ address })
//   }
// ////////////////////////////////////////////////////////////////////
//   handleSelect = address => {
//     let setLatLong = this.props.setLatLong
//     let setFormLocation = this.props.setFormLocation

//     geocodeByAddress(address)
//       .then(address => setFormLocation(address[0].formatted_address))
//       .then(results => getLatLng(results[0]))
//       .then(latLng => setLatLong(latLng) )
//       .catch(error => console.error('Error', error));
//   };

  // handleSelect = (address) => {
  //   // Pull in the setFormLocation function from the parent ReportForm
  //   const setFormLocation = this.props.setFormLocation

  //   geocodeByAddress(address)
  //     .then(function(results){
  //       // Set the location in the parent ReportFrom
  //       setFormLocation(results[0].formatted_address)
  //       return getLatLng(results[0])

  //     })
  //     .then(({lat, lng}) => {
  //       this.setState({latlng: [lng,lat]})
  //       this.props.setLatLong(this.state.latlng)
  //     })

  //     .catch(error => console.error('Error', error))
  // }
// geocodeByAddress(address)
//   .then(results => {
//     this.setstate({placeQuery:results[0].address_components[0].short_name})
//     return getLatLng(results[0])
//     console.log('some place', this.state.latlng);
//   })
//   .then(({lat , lng}) => {
//     this.setState({latlng: [lng,lat]})
//     this.props.setLatLong(this.state.latlng)

//     console.log('latlng', this.state.latlng);
//   //
// }

//   render() {
//     const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
//       <div className="autocomplete-root">
//         <input className="form-control" {...getInputProps()} />
//         <div className="autocomplete-dropdown-container">
//           {suggestions.map(suggestion => (


//             <div {...getSuggestionItemProps(suggestion)} className="suggestion">
//               <span>{suggestion.description}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );

//     // Limit the suggestions to show only cities in the US
//     const searchOptions = {
//       types: ['(cities)'],
//       componentRestrictions: {country: "us"}
//      }

//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//         // Pass the search options prop
//         searchOptions={searchOptions}
//       >
//         {renderInput}
//       </PlacesAutocomplete>
//     );
//   }
// }

// export default LocationSearchInput










/// import React from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import { classnames } from '../helpers';
// import CreateTrip from '../CreateTrip';

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: '',
//       errorMessage: '',
//       latitude: null,
//       longitude: null,
//       isGeocoding: false,
//     };
//   }

//   handleChange = address => {
//     this.setState({
//       address,
//       latitude: null,
//       longitude: null,
//       errorMessage: '',
//     });
//   };

// /// FIND A WAY TO LIFT THE STATE UP TO CREATE TRIPS
//   handleSelect = selected => {
//     this.setState({ isGeocoding: true, address: selected });
//     geocodeByAddress(selected)
//       .then(res => getLatLng(res[0]))
//       .then(({ lat, lng }) => {
//         this.setState({
//           latitude: lat,
//           longitude: lng,
//           isGeocoding: false,
//         });
//       })
//       .catch(error => {
//         this.setState({ isGeocoding: false });
//         console.log('error', error); // eslint-disable-line no-console
//       });
//   };

//   handleCloseClick = () => {
//     this.setState({
//       address: '',
//       latitude: null,
//       longitude: null,
//     });
//   };

//   handleError = (status, clearSuggestions) => {
//     console.log('Error from Google Maps API', status); // eslint-disable-line no-console
//     this.setState({ errorMessage: status }, () => {
//       clearSuggestions();
//     });
//   };

//   render() {
//     const {
//       address,
//       errorMessage,
//       latitude,
//       longitude,
//       isGeocoding,
//     } = this.state;

//     return (
//       <div>
//         <PlacesAutocomplete
//           onChange={this.handleChange}
//           value={address}
//           onSelect={this.handleSelect}
//           onError={this.handleError}
//           shouldFetchSuggestions={address.length > 2}
//         >
//           {({ getInputProps, suggestions, getSuggestionItemProps }) => {
//             return (
//               <div className="Demo__search-bar-container">
//                 <div className="Demo__search-input-container">
//                   <input
//                     {...getInputProps({
//                       placeholder: 'Search Places...',
//                       className: 'Demo__search-input',
//                     })}
//                   />
//                   {this.state.address.length > 0 && (
//                     <button
//                       className="Demo__clear-button"
//                       onClick={this.handleCloseClick}
//                     >
//                       x
//                     </button>
//                   )}
//                 </div>
//                 {suggestions.length > 0 && (
//                   <div className="Demo__autocomplete-container">
//                     {suggestions.map(suggestion => {
//                       const className = classnames('Demo__suggestion-item', {
//                         'Demo__suggestion-item--active': suggestion.active,
//                       });

//                       return (
//                         /* eslint-disable react/jsx-key */
//                         <div
//                           {...getSuggestionItemProps(suggestion, { className })}
//                         >
//                           <strong>
//                             {suggestion.formattedSuggestion.mainText}
//                           </strong>{' '}
//                           <small>
//                             {suggestion.formattedSuggestion.secondaryText}
//                           </small>
//                         </div>
//                       );
//                       /* eslint-enable react/jsx-key */
//                     })}
//                     <div className="Demo__dropdown-footer">
//                       <div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           }}
//         </PlacesAutocomplete>
//         {errorMessage.length > 0 && (
//           <div className="Demo__error-message">{this.state.errorMessage}</div>
//         )}

//         {((latitude && longitude) || isGeocoding) && (
//           <div>
//             <h3 className="Demo__geocode-result-header">Geocode result</h3>
//             {isGeocoding ? (
//               <div>
//                 <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
//               </div>
//             ) : (
//               <div>
//                 <div className="Demo__geocode-result-item--lat">
//                   <label>Latitude:</label>
//                   <span>{latitude}</span>
//                 </div>
//                 <div className="Demo__geocode-result-item--lng">
//                   <label>Longitude:</label>
//                   <span>{longitude}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default SearchBar;