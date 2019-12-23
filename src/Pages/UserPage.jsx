import React from "react";
import PropTypes from "prop-types";
import FancyButton from "../Components/FancyButton.jsx";
//import authConsumer from "../Components/authConsumer.jsx";
import protectedRedirect from "../Components/protectedRedirect.jsx";
import { userUpdate, tokenUpdate, refreshUser } from "../Store/actions";
import { UserPropTypes } from "../Store/reducer.js";
import { connect } from "react-redux";
import * as selectors from "../Store/selectors.js";
import * as services from "../services.js";
import { toast } from "react-toastify";

class UserPage extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape(UserPropTypes),
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      payments: []
    };
  }

  componentDidMount() {
    const { userId, token } = this.props;
    services.getPayments({ userId, token }).then(docs => {
      console.log("docs", docs);
      this.setState({
        payments: docs
      });
    });
  }

  handleLogout = () => {
    this.props.dispatch(userUpdate(null));
    this.props.dispatch(tokenUpdate(null));
  };

  handleSubmit = e => {
    e.preventDefault();
    // const { userId } = this.props;
    console.log("submit", `api/v1/users/${this.props.user._id}`);
    // services.updateEmail(this.props);
    fetch(`api/v1/users/${this.props.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(this.state)
    })
      .then(() => {
        this.props.dispatch(refreshUser());
        toast.success("Edting successful!");
      })
      .catch(err => {
        console.log("Error", err);
        toast.error("Editing failed!");
      });
  };

  handleChange = e => {
    console.log("handle change", e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className={"spacer"}>
        <div className={"box"}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className={"field"}>{this.props.user.email}</div>
            <div className={"field"}>{this.props.user.createdAt}</div>
            <FancyButton onClick={this.handleLogout}>Log out</FancyButton>
          </div>
        </div>
        <div className={"box"}>
          {this.state.payments.map(payment => {
            return (
              <div className={"paymentRow"} key={payment._id}>
                <div>{payment.createdAt}</div>
                <div>{payment.cart.length}</div>
                <div>{payment.amount}</div>
              </div>
            );
          })}
        </div>
        <div className={"box"}>
          <form className="editForm" onSubmit={this.handleSubmit}>
            <input
              type="email"
              placeholder="Edit email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <button>Edit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: selectors.getUser(store),
    userId: selectors.getUserId(store),
    token: selectors.getToken(store)
  };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));
