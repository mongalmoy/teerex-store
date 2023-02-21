import React, { useState, useContext, useRef } from 'react'
// import Form from 'react-bootstrap/Form';
import './SearchBar.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { UserContext } from "../../pages/TeerexStore";
import Form from 'react-bootstrap/Form';

const SearchBar = () => {
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
      {()=>{
        return (
          <div className='searchbar'>
            <input className='searchbar-input' placeholder='Search for products...' type="text" onChange={(e)=>{setInputValue(e.target.value)}} />
            <div className="search-icon" onClick={()=> searchItem()}>
              <AiOutlineSearch />
            </div>
            <div className="filter-icon" onClick={()=> toggleSideBar()}>
              
              {/* <Form.Label className='p-0 m-0 filter-label' htmlFor='filter-icon'> */}
              <FiFilter />
              {/* </Form.Label>
              <Form.Check type="checkbox" id="filter-icon" /> */}
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
    
  )
}

export default SearchBar;