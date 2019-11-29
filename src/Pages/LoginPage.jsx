import React from "react";
import "./form.css";
import {Link} from "react-router-dom";

//Controlled components
class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  //Selleks et ei refreshiks ega kirjutaks url-i
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", this.state);
    fetch("/api/users/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
    })
    .then ( res => {
        console.log("Res", res);
    })
    .catch ( err => {
        console.log("Error", err);
    });
}



  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="form">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginPage;
