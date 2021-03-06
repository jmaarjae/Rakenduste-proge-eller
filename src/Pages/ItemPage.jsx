import React from "react";
//import { digitalPianos } from "./mydatabase.js";
import PropTypes from "prop-types";
import "./itempage.css";
import FancyButton from "../Components/FancyButton.jsx";
import { connect } from "react-redux";
import { addItem } from "../Store/actions.js";
import * as services from "../services";
import { toast } from "react-toastify";

class ItemPage extends React.PureComponent {
  static propTypes = {
    // dispatch tuleb redux'ist
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      changeTitle: ""
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = () => {
    services
      .getItem({ itemId: this.props.match.params.itemId })
      .then(item => {
        this.setState({
          ...item
        });
      })
      .catch(err => {
        console.log("item page", err);
      });
  };

  handleBuy = () => {
    this.props.dispatch(addItem(this.state));
  };

  handleTitleEditSubmit = e => {
    e.preventDefault();
    console.log("submit", `api/v1/items/${this.props.match.params.itemId}`);
    fetch(`api/v1/items/${this.props.match.params.itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(() => {
        toast.success("Item title successfully changed!");
      })
      .catch(err => {
        console.log("Error", err);
        toast.error("Editing item title failed!");
      });
  };

  handleTitleChange = e => {
    // console.log("handle title change", e.target.name, e.target.value);
    this.setState({
      changeTitle: e.target.value
    });
  };

  render() {
    console.log("this.props", this.props);
    // console.log("itemID", this.props.match.params.itemId);
    // console.log("this.state", this.state);
    return (
      <>
        <div className={"box spacer itemPageContainer"}>
          <form className="editTitleForm" onSubmit={this.handleTitleEditSubmit}>
            <input
              type="string"
              placeholder="Edit item title"
              name="title"
              value={this.state.changeTitle}
              onChange={this.handleTitleChange}
            />
            <button>Edit</button>
          </form>
          <div>
            <div style={{ display: "flex" }}>
              <img className={"itemPageImage"} src={this.state.imgSrc} />
              <div className={"itemPageContent"}>
                <div className={"itemTitle"}>{this.state.title}</div>
                <div className={"itemCost"}>{this.state.price} €</div>
                <div>
                  <p style={{ textAlign: "justify" }}>{loremIpsum}</p>
                </div>
                <div className={"itemPageFooter"}>
                  <FancyButton onClick={this.handleBuy}>Buy</FancyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ItemPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default connect()(ItemPage);

const loremIpsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
