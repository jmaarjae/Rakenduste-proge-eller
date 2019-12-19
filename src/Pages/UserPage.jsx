import React from "react";
import PropTypes from "prop-types";
import FancyButton from "../Components/FancyButton.jsx";
//import authConsumer from "../Components/authConsumer.jsx";
import protectedRedirect from "../Components/protectedRedirect.jsx";
import { userUpdate, tokenUpdate } from "../Store/actions";
import { UserPropTypes } from "../Store/reducer.js";
import { connect } from "react-redux";
import * as selectors from "../Store/selectors.js";

class UserPage extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape(UserPropTypes),
    dispatch: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.dispatch(userUpdate(null));
    this.props.dispatch(tokenUpdate(null));
  };

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
