import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import { fetchCity } from '../../store/actions/headerActions'

class JobSeach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      selectedOption: null,
      jobTitleSearch: ''
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.formFieldChanges = this.formFieldChanges.bind(this);
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
  formFieldChanges(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  handleFilterChange(event) {
    let cityID = '';
    if (this.state.selectedOption && this.state.selectedOption.value) {
      cityID = this.state.selectedOption.value;
    }
    this.props.handlerFromParant({ name: this.state.jobTitleSearch, cityID: cityID, page: 0 });
  }

  render() {

    const { selectedOption } = this.state;

    return (
      <div className="bg-light">
        <div className="card-body home">
          <div className="form-row align-items-center">
            <input name="jobTitleSearch" placeholder="Job Title or Keyword" className="form-control p-2 col-sm-5" onChange={this.formFieldChanges} type="text" value={this.state.jobTitleSearch} />
            <AsyncSelect
              isClearable
              defaultOptions
              loadOptions={this.promiseOptions}
              onChange={this.handleChange}
              value={selectedOption}
              placeholder="Location"
              className="col-sm-5"
            />
            <input className="btn btn-info p-2 col-sm-2" type="submit" onClick={this.handleFilterChange} value="Search" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  if (state.headerReducer.city) {
    return { cityAll: state.headerReducer.city, error: state.profileReducer.error }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onfetchCity: (q) => dispatch(fetchCity(q))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(JobSeach);
