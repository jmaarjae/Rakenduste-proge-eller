import React from "react";
import PropTypes from "prop-types";
import "./checkbox.css"; //https://codepen.io/mburnette/pen/LxNxNg/

//HomePageist name ja onChange
const Checkbox = ({ name, onChange }) => (
  <div>
    <div className="togglerName">{name}</div>
    <input id={name} type="checkbox" onChange={onChange} />
    <label htmlFor={name}></label>
  </div>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default Checkbox;
