import React from "react";
import ItemsList from "../Components/ItemsList.jsx";
import Checkbox from "../Components/Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "../Components/SortDropdown.jsx";
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
    fetch("/api/v1/items")
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

  handleFilterSelect = event => {
    const categoryName = event.target.name;
    console.log(event.target.value, event.target.name);
    if (this.isSelected(categoryName)) {
      return this.unselectCategory(categoryName);
    }
    this.selectCategory(categoryName);
  };

  selectCategory = categoryName => {
    this.setState({
      selectedCategories: this.state.selectedCategories.concat([categoryName])
    });
  };

  //fiter loob uue listi(mitte ei muuda olemasolevat)
  unselectCategory = categoryName => {
    const newArr = this.state.selectedCategories.filter(
      cn => cn !== categoryName
    );

    this.setState({
      selectedCategories: newArr
    });
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
  isSelected = name => this.state.selectedCategories.indexOf(name) >= 0;

  handleSortDropdown = sortDirection => {
    this.setState({
      sortDirection: sortDirection //sama nimetaja puhul ei pea koolonijärgset olema
    });
  };

  render() {
    const items = this.getVisibleItems();
    return (
      <>
        <div className={"bodyWrapper"}>
          <div className={"filtersWrapper"}>
            <ItemFilters
              allCategories={this.state.allCategories}
              handleFilterSelect={this.handleFilterSelect}
              isSelected={this.isSelected}
            />
          </div>
          <div className={"itemsHeaderWrapper"}>
            <div>
              Items found {items.length}{" "}
              {this.state.selectedCategories.join(", ")}
            </div>
            <SortDropdown
              direction={this.state.sortDirection}
              onChange={this.handleSortDropdown}
            />
          </div>
          <ItemsList items={items} />
        </div>
      </>
    );
  }
}

const ItemFilters = ({ allCategories, handleFilterSelect, isSelected }) => {
  return (
    <div>
      {allCategories.map(categoryName => {
        return (
          <Checkbox
            onChange={handleFilterSelect}
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
  handleFilterSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired
};

export default HomePage;
