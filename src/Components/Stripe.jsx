import React from "react";
import { StripeProvider } from "react-stripe-elements";
import { Elements, CardElement } from "react-stripe-elements";
import "./stripe.css";

class Stripe extends React.PureComponent {
  render() {
    return (
      <StripeProvider apiKey={"pk_test_12345"}>
        <Elements>
          <form className={"stripeForm"}>
            
              Card details
              <CardElement style={{ base: { fontSize: "18px" } }} />
            
            <button className={"stripeButton"}>Pay</button>
          </form>
        </Elements>
      </StripeProvider>
    );
  }
}

export default Stripe;
