import React, { useContext } from "react";
// import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductItem from "../Components/ProductItem/ProductItem";
import { UserContext } from "./TeerexStore";

const Content = () => {
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
    remainingProducts
  ] = useContext(UserContext);

  // console.log("data", data);
  // console.log("error", error);

  // setData(prev => [...prev, ...productData]);
  // setData(productData);


  return (
    <div className="main_content" id="main_content">
      <div>
      <Row>
        {remainingProducts.map((item, index) => {
          return (
            <Col lg={4} md={6} sm={12} key={index}>
              <ProductItem item={item} />
            </Col>
          );
        })}
      </Row>
      </div>
    </div>
  );
};

export default Content;
