import React from "react";
import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";
import FancyButton from "../Components/FancyButton.jsx";
import "../Components/cart.css";
import { removeItem } from "../Store/actions.js";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as selectors from "../Store/selectors.js";
import * as services from "../services.js";
import Modal from "../Components/Modal.jsx";
import Stripe from "../Components/Stripe.jsx";

class CartPage extends React.PureComponent {
  static propTypes = {
    cartItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    cartItems: [],
    isModalOpen: false
  };

  componentDidMount() {
    this.fetchItems();
  }
  //Toodete muutumise kontroll
  componentDidUpdate(prevProps) {
    const prevPropIds = prevProps.cartItemIds.join("");
    const currentIds = this.props.cartItemIds.join("");

    if (prevPropIds !== currentIds) {
      this.fetchItems();
    }
  }

  fetchItems = () => {
    const promises = this.props.cartItemIds.map(itemId =>
      services.getItem({ itemId })
    );
    Promise.all(promises)
      .then(items => {
        this.setState({
          cartItems: items
        });
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed fetching items");
      });
  };

  calcNumbers = () => {
    const VAT = 20;
    const sum = Math.round(
      this.state.cartItems.reduce((acc, item) => acc + item.price, 0)
    );
    const tax = Math.round((sum / 100) * VAT);
    return {
      sum,
      tax
    };
  };

  handleTrash = _id => {
    this.props.dispatch(removeItem(_id));
  };

  handleModal = () => {
    console.log("handleModal");
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleSubmit = () => {
    //sulgeb
    this.handleModal();
  };

  render() {
    const { sum } = this.calcNumbers();

    return (
      <>
        <Modal open={this.state.isModalOpen} onClose={this.handleModal}>
          <Stripe sum={sum} onSubmit={this.handleSubmit} />
        </Modal>
        <div className={"spacer"}>
          <div className={"box cart"}>
            <Table onTrash={this.handleTrash} rows={this.state.cartItems} />
          </div>
          {/* Kui cart pole tyhi */}
          {this.state.cartItems.length > 0 && (
            <div className={"box cart__summary"}>
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>{sum} €</td>
                  </tr>

                  <tr>
                    <td>Total</td>
                    <td>{sum} €</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <FancyButton onClick={this.handleModal}>
                        Purchase
                      </FancyButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }
}

const Table = ({ rows, onTrash }) => {
  return (
    <div className={"table"}>
      <div className={"row"}>
        <div className={"cell"}>Product</div>
        <div className={"cell cell-grow"}>Name</div>
        <div className={"cell"}>Category</div>
        <div className={"cell cell--right"}>Sum</div>
        <div className={"cell cell--small"}></div>
      </div>
      {rows.map((row, index) => (
        <Row onTrash={onTrash} key={index} {...row} />
      ))}
    </div>
  );
};

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  onTrash: PropTypes.func.isRequired
};

const Row = ({ _id, title, imgSrc, category, price, onTrash }) => {
  return (
    <div className={"row"}>
      <div className={"cell"}>
        <img src={imgSrc} />
      </div>
      <div className={"cell cell--grow"}>{title}</div>
      <div className={"cell"}>{category}</div>
      <div className={"cell cell-right"}>{price} €</div>
      <div className={"cell cell--small cell--center hover--opacity"}>
        <FaRegTrashAlt
          title={"Eemalda"}
          className={"trashButton"}
          onClick={() => onTrash(_id)}
        />
      </div>
    </div>
  );
};

export const ItemProps = {
  _id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

Row.propTypes = {
  ...ItemProps,
  onTrash: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    cartItemIds: selectors.getCart(store)
  };
};

export default connect(mapStateToProps)(CartPage);
