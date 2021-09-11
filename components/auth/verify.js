import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../common/header'
import Footer from '../common/footer'
import { postVerify } from '../store/actions/headerActions'

class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      items: []
    };
  }
  componentDidMount() {
    document.title = "Verify";
    let code = this.props.match.params.code + '-U';
    console.log(code);
    this.props.onPostVerify(code);
  }

  render() {
    const { error, isLoaded } = this.state;
    const { webVerify } = this.props;
    console.log(webVerify);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
          <Header />
          <div className="container">
            <div className="row">
              <h1 className="col-12">Verify</h1>
              <p className="col-12">If you need help with this account, please check the Help Centre and then contact us if needed.</p>
              <div className="col-6">
                <form className="needs-validation">
                  <div className="form-group row">
                    {webVerify && webVerify.res && webVerify.valid === "true" && <div className="alert alert-success">{webVerify.res}</div>}
                    {webVerify && webVerify.res && webVerify.valid === "false" && <div className="alert alert-danger">{webVerify.res}</div>}
                    <div className="col-sm-10">
                      <Link className="btn btn-primary" to="/auth/login">Login</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }

}
const mapStatetoProps = (state) => {
  console.log(state.headerReducer.webVerify);
  return {
    webVerify: state.headerReducer.webVerify, error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostVerify: (a) => dispatch(postVerify(a))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Verify);
