import React, { useContext } from "react";
import "./FilterType.css";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../pages/TeerexStore";

const FilterType = (props) => {
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
  return (
    <UserContext.Consumer>
      {() => {
        return (
          <div className="filter-type">
            <h4>{props.type}</h4>
            <ul>
              {props.value.map((val, index) => {
                {/* console.log(val) */}
                return (
                  <li key={index}>
                    <Form.Check
                      id={val}
                      label={val}
                      className="checkbox-container"
                      onChange={(e) => {
                        filterProduct(e.target.checked, props.type, val);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default FilterType;
