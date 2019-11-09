import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import Checkbox from "./Checkbox.jsx";
//import { digitalPianos, guitars } from "./mydatabase.js";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      allCategories: ["Digital Pianos", "Guitars"],
      selectedCategories: ["Digital Pianos"]
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch("/api/items")
      .then(res => {
        console.log("res", res);
        //json tagastab Promise'i
        return res.json();
      })
      .then(items => {
        console.log("items", items);
        this.setState({
          items
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleDropdown = event => {
    console.log(event.target.value, event.target.name);
    if (this.isSelected(event.target.name)) {
      //slice'iga kopeerib uue listina
      const clone = this.state.selectedCategories.slice();
      const index = this.state.selectedCategories.indexOf([event.target.name]);
      //muudab olemasolevat listi
      clone.splice(index, 1);
      this.setState({
        selectedCategories: clone
      });
    } else {
      this.setState({
        //tagastab uue listi
        selectedCategories: this.state.selectedCategories.concat([
          event.target.name
        ])
      });
    }
  };

  getVisibleItems = () => {
    return this.state.items.filter(item => this.isSelected(item.category));
  };
  //Kontrollib kategooria olemasolu
  isSelected = name => this.state.selectedCategories.indexOf(name) >= 0;

  render() {
    console.log("this.state", this.state);
    return (
      <>
        <Header />
        {this.state.allCategories.map(categoryName => {
          return (
            <Checkbox
              key={categoryName}
              name={categoryName}
              onChange={this.handleDropdown}
              checked={this.isSelected(categoryName)}
            />
          );
        })}

        <ItemList items={this.getVisibleItems()} />
      </>
    );
  }
}

export default HomePage;