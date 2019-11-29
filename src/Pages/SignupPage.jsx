import React from "react";
import "./form.css";

class SignupPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  //Selleks et ei refreshiks ega kirjutaks url-i
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", this.state);
    fetch("/api/users/signup", {
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
      <div className={"form"}>
        <form className="register-form" onSubmit={this.handleSubmit}>
          <input
            placeholder="Email"
            name={"email"}
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            placeholder="Password"
            name={"password"}
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <input
            placeholder="Confirm password"
            name={"confirmPassword"}
            type="password"
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
          />

          <button>signup</button>
          <p className="message">
            Already registered?
            <a href={"/login"}>Login</a>
          </p>
        </form>
      </div>
    );
  }
}
export default SignupPage;
