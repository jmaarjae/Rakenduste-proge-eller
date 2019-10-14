import React from "react";
import Header from "./Header.jsx";
import { digitalPianos } from "./mydatabase.js";

class ItemPage extends React.PureComponent {
  render() {
    const item = digitalPianos[0];
    return (
      <>
        <Header />
        <div className={"itemContainer"}>
          <img src={item.imgSrc} />
          <div className={"itemTitle"}>{item.title}</div>
          <div className={"itemCost"}>{item.price}</div>
        </div>
      </>
    );
  }
}

export default ItemPage;
