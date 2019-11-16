import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import Checkbox from "./Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "./SortDropdown.jsx";
//import { digitalPianos, guitars } from "./mydatabase.js";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: -1,
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
    return this.state.items
    .filter(item => this.isSelected(item.category))
    .sort((a, b) => {
        switch (this.state.sortDirection) {
          case -1:
            return b.price - a.price;
          case 1:
            return a.price - b.price;
        }
      });
  };
  //Kontrollib kategooria olemasolu
  isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0;

  handleSortDropdown = (event) => {
    console.log("sort", event.target.value);
    this.setState({
      sortDirection: parseInt(event.target.value)
    });
  };

  render() {
    console.log("this.state", this.state);
    return (
      <>
        <Header />
        <ItemFilters
          allCategories={this.state.allCategories}
          handleDropdown={this.handleDropdown}
          isSelected={this.isSelected}
        />
        <div className={"itemsSettings"}>
          <SortDropdown
            direction={this.state.sortDirection}
            onChange={this.handleSortDropdown}
          />
        </div>
        <ItemList items={this.getVisibleItems()} />
      </>
    );
  }
}

const ItemFilters = ({ allCategories, handleDropdown, isSelected }) => {
  return (
    <div className={"itemFiltersWrapper"}>
      {allCategories.map(categoryName => {
        return (
          <Checkbox

            onChange={handleDropdown}
            key={categoryName}
            name={categoryName}
            checked={isSelected(categoryName)}
          />
        );
      })}
    </div>
  );
};

ItemFilters.propTypes = {
  allCategories: PropTypes.array.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired
};

export default HomePage;
