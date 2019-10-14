import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import { digitalPianos, guitars } from "./mydatabase.js";

class HomePage extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        items: digitalPianos
      };
    }
  
    handleChange(event) {
      console.log(event.target.value);
      switch (event.target.value) {
        case "digitalPianos": {
          this.setState({
            items: digitalPianos
          });
          break;
        }
        case "guitars": {
          this.setState({
            items: guitars
          });
          break;
        }
      }
    }
  
    render() {
      return (
        <>
          <Header />
          <select onChange={this.handleChange.bind(this)}>
            <option value="digitalPianos">Digital Pianos</option>
            <option value="guitars">Guitars</option>
          </select>
          <ItemList items={this.state.items} />
        </>
      );
    }
  }

  export default HomePage;
  