import React from "react";
import { StripeProvider } from "react-stripe-elements";
import { Elements, CardElement } from "react-stripe-elements";
import "./stripe.css";
import { injectStripe } from "react-stripe-elements";
import PropTypes from "prop-types";
import * as services from "../services";
import * as selectors from "../Store/selectors";
import * as actions from "../Store/actions";
import { connect } from "react-redux";

class Stripe extends React.PureComponent {
  static propTypes = {
    sum: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    return (
      <StripeProvider apiKey={"pk_test_g8yeNcKwngg0RQwrK788YYEW00i6LRfEzB"}>
        <Elements>
          <InjectedStripeForm
            sum={this.props.sum}
            onSubmit={this.props.onSubmit}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Stripe;

class StripeForm extends React.PureComponent {
  static propTypes = {
    stripe: PropTypes.object.isRequired,
    sum: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.stripe.createToken().then(({ error, token }) => {
      console.log("Stripe: result", error, token);
      if (error) {
        console.error("Stripe: token error", error);
        return;
      }
      services
        .checkout({
          stripeToken: token,
          userId: this.props.userId,
          token: this.props.token
        })
        .then(x => {
          console.log("checkout", x);
          this.props.dispatch(actions.refreshUser());
          //sulgeb modali
          this.props.onSubmit();
        })
        .catch(err => {
          console.error(err);
        });
    });
  };
  render() {
    return (
      <form className={"stripeForm"} onSubmit={this.handleSubmit}>
        Card details
        <CardElement style={{ base: { fontSize: "18px" } }} />
        <button className={"stripeButton"}>Pay {this.props.sum}€</button>
      </form>
    );
  }
}

//userId kättesaamiseks
const mapStateToProps = store => {
  return {
    userId: selectors.getUserId(store),
    token: selectors.getToken(store)
  };
};

const InjectedStripeForm = connect(mapStateToProps)(injectStripe(StripeForm));
