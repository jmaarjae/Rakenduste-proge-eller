import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./itemslist.css";

const ItemsList = (props) => {
  return (
    <div className={"itemsLayout"}>
      {props.items.map(item => {
        return (
          <Item
            key={item._id}
            id={item._id}
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
    <Link to={`/items/${props.id}`} className={"item"}>
      <div className={"item_imgWrapper"}>
        <img src={props.imgSrc} />
      </div>
      <div className={"itemDescription"}>
        <div className="itemTitle">{props.title}</div>
        <div className={"itemFooter"}>
          <div className="itemCost">${props.price}</div>
          {/* <div className="itemReviews">{`(${getRandomIntInclusive(0,100)} reviews)`}</div> */}
        </div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default ItemsList;
