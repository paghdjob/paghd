import React, { Component } from 'react'
import { connect } from 'react-redux'

class FilterAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      cityFilter: [],
      workTypeFilter: [],
      skillFilter: [],
      languageFilter: [],
      industryFilter: [],
      jobTitleSearch: ''
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.formFieldChanges = this.formFieldChanges.bind(this);
  }
  formFieldChanges(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleFilterChange(event) {
    if (event.target.name === 'city') {
      if (event.target.checked === true) {
        this.state.cityFilter.push(event.target.value);
      } else {
        let removedCity = this.state.cityFilter.indexOf(event.target.value);
        this.state.cityFilter.splice(removedCity, 1);
      }
    }
    if (event.target.name === 'workType') {
      if (event.target.checked === true) {
        this.state.workTypeFilter.push(event.target.value);
      } else {
        let removedWork = this.state.workTypeFilter.indexOf(event.target.value);
        this.state.workTypeFilter.splice(removedWork, 1);
      }
    }
    if (event.target.name === 'skill') {
      if (event.target.checked === true) {
        this.state.skillFilter.push(event.target.value);
      } else {
        var removedSkill = this.state.skillFilter.indexOf(event.target.value);
        this.state.skillFilter.splice(removedSkill, 1);
      }
    }
    if (event.target.name === 'language') {
      if (event.target.checked === true) {
        this.state.languageFilter.push(event.target.value);
      } else {
        let removedLang = this.state.languageFilter.indexOf(event.target.value);
        this.state.languageFilter.splice(removedLang, 1);
      }
    }
    if (event.target.name === 'industry') {
      if (event.target.checked === true) {
        this.state.industryFilter.push(event.target.value);
      } else {
        let removedInd = this.state.industryFilter.indexOf(event.target.value);
        this.state.industryFilter.splice(removedInd, 1);
      }
    }
    this.props.handlerFromParant({
      workTypeID: this.state.workTypeFilter,
      skillID: this.state.skillFilter,
      langID: this.state.languageFilter,
      IndID: this.state.industryFilter,
      page: 0
    });
    // let queryUrl = '&cityID=' + this.state.cityFilter + '&name=' + this.state.jobTitleSearch + '&workTypeID=' + this.state.workTypeFilter + '&skillID=' + this.state.skillFilter + '&langID=' + this.state.languageFilter + '&IndID=' + this.state.industryFilter
    // this.props.onFetchData(queryUrl);
  }

  render() {
    const { filt } = this.props;
    let cities;
    if (filt && filt.city) {
      cities = filt.city.map((data, key) => {
        return (
          <div key={data.cityID}>
            <label><input className="checkbox-control" onChange={this.handleFilterChange} type="checkbox" name="city" value={data.cityID} />
              &nbsp; {data.cityName}</label>
          </div>
        );
      }
      );
    }
    let workType;
    if (filt && filt.workType) {
      workType = filt.workType.map((data, key) => {
        return (
          <div key={data.workTypeID}>
            <label><input className="checkbox-control" onChange={this.handleFilterChange} type="checkbox" name="workType" value={data.workTypeID} />
              &nbsp; {data.workTypeName} ({data.tot})</label>
          </div>
        );
      }
      );
    }
    let skills;
    if (filt && filt.skills) {
      skills = filt.skills.map((data, key) => {
        return (
          <div key={data.skillID}>
            <label><input className="checkbox-control" onChange={this.handleFilterChange} type="checkbox" name="skill" value={data.skillID} />
              &nbsp;{data.skillName} ({data.tot})</label>
          </div>
        );
      }
      );
    }

    let languages;
    if (filt && filt.skills) {
      languages = filt.languages.map((data, key) => {
        return (
          <div key={data.langID}>
            <label><input className="checkbox-control" onChange={this.handleFilterChange} type="checkbox" name="language" value={data.langID} />
              &nbsp;{data.langName} ({data.tot}) </label>
          </div>
        );
      }
      );
    }

    let industry;
    if (filt && filt.industry) {
      industry = filt.industry.map((data, key) => {
        return (
          <div key={data.IndID}>
            <label><input className="checkbox-control" onChange={this.handleFilterChange} type="checkbox" name="industry" value={data.IndID} />
              &nbsp; {data.IndName} ({data.tot})</label>
          </div>
        );
      }
      );
    }

    return (
      <div className="rows bg-light">
        {/* <div className="card1 mt-md-2">
          <div className="card-body">
            <div className="form-group row">
              <input name="jobTitleSearch" placeholder="search by job title" className="form-control col-sm-9" onChange={this.formFieldChanges} type="text" value={this.state.jobTitleSearch} />
              &nbsp; <input className="btn btn-info col-sm-2" type="submit" onClick={this.handleFilterChange} value="GO" />
            </div>
          </div>
        </div> */}
        {/* <div className="card-header">
            City
          </div>
          <div className="card-body">
            {cities}
          </div> */}


        <div className="card-header">
          Industry
          </div>
        <div className="card-body">
          {industry}
        </div>
        <div className="card-header">
          Job Type
          </div>
        <div className="card-body">
          {workType}
        </div>
        <div className="card-header">
          Skill
          </div>
        <div className="card-body">
          {skills}
        </div>
        <div className="card-header">
          Language
          </div>
        <div className="card-body">
          {languages}
        </div>
      </div>
    )
  }
}

// const mapStatetoProps = (state) => {
//   return { page: state.page, data: state.data, error: state.error }
// }

// const mapDispatchToProps = (dispatch) => {
//   return { onFetchData: (q) => dispatch(fetchData(q)) }
// }

export default connect(null, null)(FilterAll);
