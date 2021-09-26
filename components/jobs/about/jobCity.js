import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";

const JobCity = (props) => {
  const [countryList, setCountryList] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [cityList, setCityList] = useState("");
  const [city, setCity] = useState(props.city);
  const [cityName, setCityName] = useState("");
  const [isAutoSearch, setIsAutoSearch] = useState(false);
  const debouncedSearchTerm = useDebounce(cityName, 750);
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    if (debouncedSearchTerm && setIsAutoSearch) {
      searchCityName(cityName);
    }
    if (!countryList) {
      fetch("/v2/auto.php?type=COUNTRY")
        .then((res) => res.json())
        .then(
          (result) => {
            setCountryList(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, [debouncedSearchTerm]);

  const searchCityName = (cityName) => {
    if (cityName) {
      fetch("/v2/auto.php?type=CITY&name=" + cityName)
        .then((res) => res.json())
        .then(
          (result) => {
            setCityList(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  };

  const removeCity = (jobCityID) => {
    const body = { jobCityID: jobCityID, userID: userID, jobID: props.jobID };

    fetch("/v2/jobs/aboutSet.php?type=DELETECITY", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCity(result.city);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const addLocation = () => {
    const body = {
      cityName: cityName,
      countryCode: countryCode,
      jobID: props.jobID,
      userID: userID,
    };

    fetch("/v2/jobs/aboutSet.php?type=ADDCITY", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCityList("");
          setCityName("");
          setCity(result.city);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const cityView =
    city &&
    city.map((item) => {
      return (
        <span key={item.jobCityID} className="badge m-1 bg-secondary">
          <label className="p-2">
            {item.cityName}, {item.countryCode}
          </label>
          <button
            onClick={removeCity.bind(this, item.jobCityID)}
            type="button"
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>{" "}
          </button>
        </span>
      );
    });

  const addcityForm = (
    <form className="row">
       <div className="form-group col-4">
        <label className="text-left pl-0">Country &nbsp;</label>
        <select
          className="form-control col-4"
          defaultValue={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          name="countryCode"
          value={countryCode}
          required
        >
          <option value="">Please select country</option>
          {countryList &&
            countryList.map((item) => (
              <option key={item.countryCode} value={item.countryCode}>
                {item.countryName}
              </option>
            ))}
        </select>
      </div>
        <div className="col-6">
          <label className="text-left pl-0">&nbsp;City</label>
          <input
            name="cityName"
            placeholder="Type to search city name..."
            className="autocomplete form-control p-2"
            onChange={(e) => {
              setIsAutoSearch(true), setCityName(e.target.value);
            }}
            type="text"
            value={cityName}
          />
          <ul className="list-group autocomplete-items">
            {cityList &&
              cityList.map((langName) => {
                return (
                  <li
                    onClick={(e) => {
                      setCityName(langName.label), setCityList("");
                    }}
                    className="list-group-item text-start"
                    key={langName.label}
                  >
                    {langName.label}
                  </li>
                );
              })}
          </ul>
        </div>
      <div className="col-2 mt-4">
        <button type="button" onClick={addLocation} className="btn btn-info">
          Add City
        </button>
      </div>
    </form>
  );

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Job Opening Location</div>
        <div className="card-body">
          {cityView}
          {addcityForm}
        </div>
      </div>
    </div>
  );
};
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
