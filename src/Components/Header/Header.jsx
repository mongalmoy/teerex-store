import React, { useContext } from "react";
import "./Header.css";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../../pages/TeerexStore";

const Header = () => {
  const [
    filterProduct,
    filterObj,
    addToCart,
    product,
    error,
    cartItem,
    searchItem,
    setInputValue,
    handleChangeQuantity,
    deleteCartItem,
    toggleSideBar,
    remainingProducts,
    setProduct
  ] = useContext(UserContext);

  let qty = 0;
  cartItem.forEach(item => {
    qty+=item.quantity;
  })

  return (
    <UserContext.Consumer>
      {() => {
      return (
        <div className="header">
          <div className="header-heading">
            <Link to="/">
              <h1>TeeRex Store</h1>
            </Link>
          </div>
          <nav>
            <div className="header-links">
              <div className="header-link-item">
                <Link to="/">
                  <span className="product">Product</span>
                </Link>
              </div>
              <div className="header-link-item">
                <Link to="/shopping-cart">
                  <BsCart3 />
                </Link>
                <span className="cart-count">{qty}</span>
              </div>
            </div>
          </nav>
        </div>
      );
      }}
    </UserContext.Consumer>
  )
};

export default Header;
