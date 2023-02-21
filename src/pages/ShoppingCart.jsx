import React, { useContext } from "react";
import CartItem from "../Components/CartItem/CartItem";
import { UserContext } from "./TeerexStore";

const ShoppingCart = () => {
  const [filterProduct, filterObj, addToCart, product, error, cartItem] =
    useContext(UserContext);
  console.log("ShoppingCart", cartItem);
  let totalPrice = 0;
  cartItem.map((item) => {
    totalPrice += item.quantity * item.price;
  });
  return (
    <UserContext.Consumer>
      {() => {
        return (
          <div className="body_content">
            <div className="shopping-cart">
              <h2>Shopping Cart</h2>
              <div className="cart-item-container">
                <table className="cart-items-table">
                  {cartItem.map((item, index) => {
                    return <CartItem key={index} item={item} />;
                  })}
                </table>
              </div>
              <div className="divide-line">
                <hr />
              </div>
              <div className="total-amount">
                <h5>
                  <span>Total Amount</span> : Rs {totalPrice}
                </h5>
              </div>
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default ShoppingCart;
