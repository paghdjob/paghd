import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JOBLIST } from '../../store/actions/jobListActions'
import { Link } from 'react-router-dom'

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorts: 1
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
  onScroll = () => {
    if (this.props.list) {
      if (((this.props.pages + 1) * 10) === this.props.list.jobs.length) {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10) && this.props.list.jobs.length) {
          this.props.handlerFromParant({ page: this.props.pages + 1 });
        }
      }
    }
  }
  sortFieldChanges = (event) => {
    this.setState({ page: 0, sorts: event.target.value });
    this.props.handlerFromParant({ sorts: event.target.value, page: 0 });
  }
  handleSubmit = () => {
    this.setState({ page: this.props.pages + 1 });
    this.props.handlerFromParant({ sorts: this.state.sorts, page: this.props.pages + 1 });
  }

  render() {
    const { list, sorts } = this.props;
    function salaryTypes(id) {
      switch (id) {
        case "1":
          return "Per Year";
        case "2":
          return "Per Month";
        case "3":
          return "Per Day";
        case "4":
          return "Per Hour";
        case "5":
          return "Fixed";
        default:
          return "As per industry standards";
      }
    }
    return (
      <div className="marketing">
        <div className="rows bg-light">
           <div className="col">
            <form className="form-inline mb-2">
              <div className="form-group">
                <label>Sort by:</label>
                <select onChange={this.sortFieldChanges} name="sorts" value={sorts} className="form-control mx-sm-3 custom-select custom-select-sm">
                  <option value="1">Reletive</option>
                  <option value="2">Newest</option>
                  <option value="3">Oldest</option>
                </select>
              </div>
            </form>
          </div> 
        </div>
        <div className="row">
          {list && list.jobs.map(data =>
            <div className="pl-0 pb-2 col-md-6 col-lg-6 col-xl-4" key={data.jobID}>
              <div className="card">
                <div className="pb-0 card-body">
                  <div className="float-left mr-3"><i className="fa fa-briefcase icon32 disabled" aria-hidden="true"></i></div>
                  <div className="text-left"><h6 className="card-title text-capitalize mb-1"><Link className="text-dark" to={'/job/' + data.jobSlug}>{data.jobTitle}</Link> {data.jobStatus === "1" && <i title="Verified" className="fa fa-check-circle green"></i>}</h6>
                    <p className="text-capitalize text-muted">{data.comName}</p></div>
                </div>
                <div className="card-footer">
                  {data.cityName && <span className="text-capitalize"> <i className="fa fa-map-marker" aria-hidden="true"></i> {data.cityName} {data.countryCode}</span>}
                  {data.workTypeName && <span className="text-capitalize"> <i className="fa fa-briefcase" aria-hidden="true"></i> {data.workTypeName}</span>}
                  {data.jobSalaryStart && <span className="text-capitalize"> <i className="fa fa-inr" aria-hidden="true"></i> {data.jobSalaryStart} - {data.jobSalaryEnd}</span>}
                  {salaryTypes(data.jobSalaryType)} &nbsp; <i className="fa fa-clock-o icon" aria-hidden="true"></i> {new Date(data.jobDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="card-body1">
          <div className="rows align-items-center">
            <button className="col btn btn-outline-warning" onClick={this.handleSubmit}> Result: {list && list.jobs.length}, Load more...   </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return { list: state.joblistReducer.data, error: state.error }
}
const mapDispatchToProps = (dispatch) => {

  // return { onFetchData: (q) => dispatch(JOBLIST(q)) }
}
export default connect(mapStatetoProps, mapDispatchToProps)(JobList);
