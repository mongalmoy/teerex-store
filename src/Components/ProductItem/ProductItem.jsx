import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ProductItem.css";
import { UserContext } from "../../pages/TeerexStore";

const ProductItem = (props) => {
  const { item } = props;
  // console.log("jhuyuguygghiuhu",item)
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

  // console.log("items..................",item)

  return (
    <div className="product_item">
      <Card>
        {/* <div className="card_img"></div> */}
        <div className="product-img-container">
          <Card.Img className="mb-2" variant="top" src={item.imageURL} />
        </div>
        <div className="card_body">
          <div className="product_price">
            Rs <span>{item.price}</span>
          </div>
          <Button
            value={JSON.stringify(item)}
            // variant="secondary"
            onClick={(e) => {
              addToCart(e.target.value).then(() => setProduct(remainingProducts))
              // handleChangeCartItem();
            }}
          >
            Add to cart
          </Button>
        </div>
        <div className="out_of_stock">
          <p>{item?.message}</p>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
