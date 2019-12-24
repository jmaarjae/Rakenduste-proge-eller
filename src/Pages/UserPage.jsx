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
      title: "",
      imgSrc: "",
      price: "",
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

  handleEmailEditSubmit = e => {
    e.preventDefault();
    console.log("submit", `api/v1/users/${this.props.user._id}`);
    fetch(`api/v1/users/${this.props.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

  handleEmailChange = e => {
    // console.log("handle change", e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddItemSubmit = e => {
    e.preventDefault();
    console.log("submit: add item", `api/v1/items/${this.props}`);
    fetch("api/v1/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(() => {
        toast.success("Item successfully added!");
      })
      .catch(err => {
        console.log("Error", err);
        toast.error("Adding item failed!");
      });
  };

  handleAddItem = e => {
    // console.log("handle add item", e.target.name, e.target.value);
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
          <form className="editForm" onSubmit={this.handleEmailEditSubmit}>
            <input
              type="email"
              placeholder="Edit email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <button>Edit</button>
          </form>
        </div>
        <div className={"box"}>
          <form className="addItemForm" onSubmit={this.handleAddItemSubmit}>
            <input
              type="string"
              placeholder="Item title"
              name="title"
              value={this.state.title}
              onChange={this.handleAddItem}
            />
            <input
              type="string"
              placeholder="Image source"
              name="imgSrc"
              value={this.state.imgSrc}
              onChange={this.handleAddItem}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={this.state.price}
              onChange={this.handleAddItem}
            />
            <button>Add Item</button>
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
