import React from "react";
import PropTypes from "prop-types";
import FancyButton from "../Components/FancyButton.jsx";
//import authConsumer from "../Components/authConsumer.jsx";
import protectedRedirect from "../Components/protectedRedirect.jsx";
import { userUpdate, tokenUpdate } from "../Store/actions";
import { UserPropTypes } from "../Store/reducer.js";
import { connect } from "react-redux";
import * as selectors from "../Store/selectors.js";
// import { toast } from "react-toastify";

class UserPage extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape(UserPropTypes),
    dispatch: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: ""
  //   };
  // }

  handleLogout = () => {
    this.props.dispatch(userUpdate(null));
    this.props.dispatch(tokenUpdate(null));
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   console.log("submit", this.state);
  //   fetch(`api/v1/users/${this.props.user._id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //     .then(res => res.json())

  //     .then(() => {
  //       this.props.history.push("/users/");
  //       toast.success("Edting successful!");
  //     })
  //     .catch(err => {
  //       console.log("Error", err);
  //       toast.error("Editing failed!");
  //     });
  // };

  // handleChange = e => {
  //   console.log("handle change", e.target.name, e.target.value);
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  render() {
    return (
      <div className={"spacer"}>
        <div className={"box"}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className={"field"}>{this.props.user.email}</div>
            <div className={"field"}>{this.props.user.createdAt}</div>
            <FancyButton onClick={this.handleLogout}>Logi välja</FancyButton>
          </div>
        </div>
        {/* <form className="edit-form" onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="edit email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form> */}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: selectors.getUser(store)
  };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));
