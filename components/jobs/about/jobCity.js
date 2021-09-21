import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";

const JobCity = (props) => {
  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Opening Location</div>
        <div className="card-body">
           
        </div>
      </div>
    </div>
  );
}
export default JobCity;

/*
class JobCity extends Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    let userIds = cookies.get('userID');
    this.state = {
      error: null,
      isLoaded: true,
      access: true,
      userIds: userIds,
      selectedOption: null,
      countryCode: 'in'
    };
    this.addCity = this.addCity.bind(this);
  }
  componentWillMount() {
    this.props.onFetchCountry();
  }
  fieldChange = (x) => {
    this.setState({ countryCode: x.target.value });
  }

  filterColors = (inputValue) => {
    if (inputValue) {
      this.props.onfetchCity(inputValue);
      return this.props.cityAll;
    }
  };
  promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(this.filterColors(inputValue));
    });

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  removeCity(event) {
    let body = { jobCityID: event, userID: this.state.userIds, jobID: this.props.jobID };
    this.props.onDeleteCity(body);
  }
  addCity(event) {
    let body = { cityName: this.state.selectedOption.label, countryCode: this.state.countryCode, jobID: this.props.jobID, userID: this.state.userIds };
    this.props.onAddCity(body);
    this.setState({ selectedOption: '' });
    event.preventDefault();
  }
  render() {
    const { error, isLoaded, userIds, selectedOption, countryCode } = this.state;
    const { city, country, userID } = this.props;
    let access = false;
    if (userID === userIds) {
      access = true;
    }
    let cityView;
    if (city) {
      cityView = city.map((item) => {
        return (
          <span key={item.jobCityID} className="badge m-1 badge-secondary"><label className="p-2">{item.cityName}, {item.countryCode}</label>
            {access === true ?
              <button onClick={this.removeCity.bind(this, item.jobCityID)} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
              : ''}
          </span>
        );
      }
      );
    }

    let addcityForm;
    if (access === true) {
      addcityForm = <form method="POST" className="form-inline row mt-2" onSubmit={this.addCity} >
        <div className="form-group section col-sm-12">
          <label className="text-left pl-0">Country &nbsp;</label>
          <select className="form-control col-sm-4" onChange={this.fieldChange} name="countryCode" value={countryCode} required >
            <option value="">Please select country</option>
            {country && country.map((item) => (
              <option key={item.countryCode} value={item.countryCode}>{item.countryName}</option>
            ))}
          </select>
          <label className="text-left pl-0">&nbsp;City</label>
          <AsyncCreatableSelect
            isClearable
            cacheOptions
            defaultOptions
            loadOptions={this.promiseOptions}
            onChange={this.handleChange}
            value={selectedOption}
            className="col"
          />
          <button type="submit" className="btn btn-info my-1">Add City</button>
        </div>
      </form>
    }


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
          <div className="card mb-1">
            <div className="card-header">Opening Location</div>
            <div className="card-body">
              {cityView}
              {addcityForm}
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStatetoProps = (state) => {
  if (state.profileReducer.info) {
    return { city: state.profileReducer.info.jobCity, cityAll: state.headerReducer.city, country: state.headerReducer.country, error: state.profileReducer.error }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteCity: (body) => dispatch(deleteCity(body)),
    onAddCity: (body) => dispatch(addCity(body)),
    onfetchCity: (q) => dispatch(fetchCity(q)),
    onFetchCountry: () => dispatch(fetchCountry())
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(JobCity);
*/