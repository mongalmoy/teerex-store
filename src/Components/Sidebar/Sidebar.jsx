import React, { useContext } from "react";
import "./Sidebar.css";
import FilterType from "../FilterType/FilterType";
import { filterItem } from "../../Data/filterItem";
import { UserContext } from "../../pages/TeerexStore";

const Sidebar = () => {
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

  

  return (
    <UserContext.Consumer>
      {() => {
        return (
          <div className="sidebar" id="sidebar" >
            <div className="sidebar-content" id="sidebar-content">
              {filterItem.map((item, index) => {
                return (
                  <FilterType key={index} type={item.type} value={item.value} />
                );
              })}
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Sidebar;
