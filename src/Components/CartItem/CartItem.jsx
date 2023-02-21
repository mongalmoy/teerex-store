import React, { useContext } from "react";
import "./CartItem.css";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../pages/TeerexStore";

const CartItem = (props) => {
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
    toggleSideBar
  ] = useContext(UserContext);

  const { item } = props;
  // console.log(",,,,,,,,,,,", props.item);
  return (
    <UserContext.Consumer>
      {() => {
        return (
          <tr className="cart-item">
            <td className="cart-name-img">
              <div className="cart-img">
                <img src={item.imageURL} alt="_cartImg" />
              </div>
              <div className="cart-name">
                <div>
                  <h5>{item.name}</h5>
                  <p>Rs {item.price}</p>
                </div>
              </div>
            </td>
            <td className="cart-quantity-container">
              <div className="cart-qty">
                <div
                  className="plus"
                  onClick={() => {
                    handleChangeQuantity("inc",item);
                  }}
                >
                  +
                </div>
                <div className="qty">Qty : {item.quantity}</div>
                <div
                  className="minus"
                  onClick={() => {
                    handleChangeQuantity("dec",item);
                  }}
                >
                  -
                </div>
              </div>
            </td>
            <td className="cart-delete">
              <Button variant="danger" value={JSON.stringify(item)} onClick={()=> {deleteCartItem(item)}}>
                Delete
              </Button>
            </td>
          </tr>
        );
      }}
    </UserContext.Consumer>
  );
};

export default CartItem;
