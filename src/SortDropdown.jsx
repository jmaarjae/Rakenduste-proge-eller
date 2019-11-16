import React from "react";
import PropTypes from "prop-types";
import "./sortDropdown.css";

class SortDropdown extends React.PureComponent {
  state = {
    open: false
  };

  handleTrigger = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className={"custom-select-wrapper"} onClick={this.handleTrigger}>
        <div //kui olek avatud, lisatakse klass juurde ("opened", custom-select sources opened)
          className={`custom-select sources ${this.state.open ? "opened" : ""}`}
        >
          <span className={"custom-select-trigger"}>
            {getDirectionText(this.props.direction)}
          </span>
          <div className={"custom-options"}>
            <span
              className={"custom-option"}
              onClick={() => this.props.onChange(1)}
            >
              {getDirectionText(1)}
            </span>
            <span
              className={"custom-option"}
              onClick={() => this.props.onChange(-1)}
            >
              {getDirectionText(-1)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const getDirectionText = (x) => {
  switch (x) {
    case 1: return "Price low to high";
    case -1: return "Price high to low";
  }
};

// <div>
//   <select value={direction} onChange={onChange}>
//     <option value={-1}>Price high to low</option>
//     <option value={1}>Price low to high</option>
//   </select>
// </div>
// );

SortDropdown.propTypes = {
  direction: PropTypes.oneOf([1, -1]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SortDropdown;
