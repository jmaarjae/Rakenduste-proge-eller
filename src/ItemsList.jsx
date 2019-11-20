import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ItemsList = props => {
  return (
    <div className={"itemsLayout"}>
      {props.items.map(item => {
        return (
          <Item
            key={item.id}
            id={item.id}
            imgSrc={item.imgSrc}
            price={item.price}
            title={item.title}
          />
        );
      })}
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired
};

const Item = props => {
  return (
    <Link to={`/items/${props.id}`}>
      <div className={"bodyWrapper"}>
      <div className={"item"}>
        <img src={props.imgSrc} />
        <div className="itemTitle">{props.title}</div>
        <div className="itemCost">{props.price}</div>
      </div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default ItemsList;
