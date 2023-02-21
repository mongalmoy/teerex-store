import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import ShoppingCart from "./ShoppingCart";

const Body = () => {

  return (
    
      <div className="body_content">
        {/* <Routes>
          <Route path="/main" element={<Home />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes> */}
      </div>
    
  );
};

export default Body;
