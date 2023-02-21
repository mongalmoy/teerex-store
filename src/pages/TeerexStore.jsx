import React, { createContext, useState, useEffect, useRef } from "react";
import "../App.css";
import Header from "../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ToastSuccess from "../Components/Toast/ToastSuccess";
import { Toast, Modal } from "react-bootstrap";

export const UserContext = createContext();

const TeerexStore = () => {
  const filterObjSchema = {
    color: {},
    gender: {},
    price: {},
    type: {},
  };

  const [filterObj, setFilterObj] = useState(filterObjSchema);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [remainingProducts, setRemainingProducts] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";


  const { pathname, state } = useLocation();


  const fetchData = () => {
    axios
      .get(url)
      .then((getData) => {
        setData(getData.data);
        setProduct(getData.data);
        setRemainingProducts(getData.data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToastMessage(state.successMessage)
    setShowToast(true);
  }, [toastMessage])



  const handleSetFilterObj = async (checked, type, val) => {
    setFilterObj((prev) => {
      if (!checked) delete prev[type.toLowerCase()][val];
      else prev[type.toLowerCase()][val] = checked;
      return { ...prev };
    });
  };

  console.log("product", product);
  // console.log("filterObj", filterObj);

  function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
  }

  let flag = 1;

  const filterProduct = (checked, type, val) => {
    // console.log("JJJJJJJJJJ", filterObj);
    let flag = 1;
    handleSetFilterObj(checked, type, val)
      .then(() => {
        // console.log("filterObj", filterObj);
        let productItem = [];
        Object.keys(filterObj).forEach((filterId) => {
          if (Object.keys(filterObj[filterId]).length > 0) {
            flag = 0;
          }
          if (filterId === "price" && !isEmptyObj(filterObj[filterId])) {
            const filterKeys = Object.keys(filterObj[filterId]);
            filterKeys.forEach((filterKey) => {
              let newData = [];
              if (filterKey === "0-Rs250") {
                newData = data.filter(
                  (item) => item[filterId] >= 0 && item[filterId] <= 250
                );
              } else if (filterKey === "Rs251-450") {
                newData = data.filter(
                  (item) => item[filterId] >= 251 && item[filterId] < 450
                );
              } else if (filterKey === "Rs 450") {
                newData = data.filter((item) => item[filterId] === 450);
              }
              productItem = [...new Set([...productItem, ...newData])];
            });
          } else if (!isEmptyObj(filterObj[filterId])) {
            const filterKeys = Object.keys(filterObj[filterId]);
            // console.log("filterKeys", filterKeys);
            filterKeys.forEach((filterKey) => {
              const newData = data.filter((item) => {
                return item[filterId] === filterKey;
              });
              productItem = [...new Set([...productItem, ...newData])];
            });
          }
        });
        setProduct(remainingProducts);
        setRemainingProducts(productItem);
        if (flag) {
          setRemainingProducts(data);
        }
      })

      .then(() => {});
  };

  const addToCart = async (value) => {
    const selectedItem = JSON.parse(value);
    let flag = 0,
      check = false;
    setRemainingProducts((prevRemainingProducts) => {
      const newRemainingProducts = prevRemainingProducts.map((item) => {
        if (item.id === selectedItem.id) {
          if (item.quantity > 1) {
            flag = 1;
            check = true;
            return { ...item, quantity: item.quantity - 1 };
          } else if (item.quantity === 1) {
            flag = 2;
            check = true;
            return {
              ...item,
              quantity: item.quantity - 1,
              message: "This Item is Out of Stock",
            };
          }
        }
        return item;
      });
      return newRemainingProducts;
    });

    let index2 = -1;
    cartItem.forEach((item) => {
      if (item.id === selectedItem.id) index2 = 1;
    });
    if (index2 !== -1) {
      setCartItem((prevCartItem) => {
        const newCartItem = prevCartItem.map((item) => {
          if (item.id === selectedItem.id && check) {
            if (flag === 2) {
              return {
                ...item,
                quantity: item.quantity + 1,
                message: "This Item is Out of Stock",
              };
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return newCartItem;
      });
    } else {
      selectedItem.quantity = 1;
      setCartItem([...cartItem, selectedItem]);
    }
  };

  const searchItem = () => {
    // console.log("inputValue", inputValue);
    if (inputValue === null) return;
    const newProduct = data.filter((item) => {
      let isIncludes = false;
      Object.keys(item).forEach((keys) => {
        if (
          keys === "color" ||
          keys === "gender" ||
          keys === "name" ||
          keys === "type"
        ) {
          // console.log(item[keys]);
          if (item[keys].toLowerCase().includes(inputValue.toLowerCase())) {
            isIncludes = true;
            return;
          }
        }
      });
      // handleSetFilterObj();
      // console.log(isIncludes);
      return isIncludes;
    });
    setProduct(newProduct);
    setRemainingProducts(newProduct);
    // console.log("newProduct", newProduct);
  };

  console.log("remainingProducts", remainingProducts);
  // console.log("message", message);
  console.log("cartItem", cartItem);
  // console.log("data", data)

  const handleChangeQuantity = (type, selectedItem) => {
    // console.log("type", type)
    // console.log("selectedItem", selectedItem);

    if (type === "inc") {
      let flag = 0;
      setRemainingProducts((prevRemainingProducts) => {
        const newRemainingProducts = prevRemainingProducts.map((item) => {
          if (item.id === selectedItem.id) {
            if (item.quantity > 1) {
              flag = 1;
              console.log("msg1");
              return { ...item, quantity: item.quantity - 1 };
            } else if (item.quantity === 1) {
              console.log("msg2");
              flag = 2;
              return {
                ...item,
                quantity: item.quantity - 1,
                message: "This Item is Out of Stock",
              };
            }
          }
          return item;
        });
        return newRemainingProducts;
      });
      setCartItem((prevCartItem) => {
        const newCartItem = prevCartItem.map((item) => {
          if (item.id === selectedItem.id) {
            if (flag === 2)
              return {
                ...item,
                quantity: item.quantity + 1,
                message: "This Item is Out of Stock",
              };
            else if (flag === 1)
              return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return newCartItem;
      });
    } else {
      setRemainingProducts((prevRemainingProducts) => {
        const newRemainingProducts = prevRemainingProducts.map((item) => {
          if (item.id === selectedItem.id) {
            return { ...item, quantity: item.quantity + 1, message: "" };
          }
          return item;
        });
        return newRemainingProducts;
      });
      if (selectedItem.quantity === 1) {
        const newCartItem = cartItem.filter(
          (item) => !selectedItem.id === item.id
        );
        setCartItem(newCartItem);
      } else {
        const newCartItem = cartItem.map((item) => {
          if (selectedItem.id === item.id)
            return { ...item, quantity: item.quantity - 1, message: "" };
          return item;
        });
        setCartItem(newCartItem);
      }
    }
  };

  const deleteCartItem = (selectedItem) => {
    const newRemainingProducts = remainingProducts.map((item) => {
      if (item.id === selectedItem.id)
        return { ...item, quantity: item.quantity + selectedItem.quantity };
      else return item;
    });
    setRemainingProducts(newRemainingProducts);

    const newCartItem = cartItem.filter((item) => item.id !== selectedItem.id);
    setCartItem(newCartItem);
  };

  const toggleSideBar = () => {
    if (document.getElementById("main_content").style.opacity === "1") {
      document.getElementById("main_content").style.opacity = "0.1";
    } else {
      document.getElementById("main_content").style.opacity = "1";
    }

    if (document.getElementById("sidebar").style.display === "block") {
      document.getElementById("sidebar").style.display = "none";
    } else {
      document.getElementById("sidebar").style.display = "block";
    }

    if (document.getElementById("sidebar-content").style.display === "block") {
      document.getElementById("sidebar-content").style.display = "none";
    } else {
      document.getElementById("sidebar-content").style.display = "block";
    }
  };

  window.addEventListener("resize", () => {
    if (document.body.clientWidth >= 600) {
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("sidebar-content").style.display = "block";
      document.getElementById("main_content").style.opacity = "1";
    }

    if (
      document.body.clientWidth < 600 &&
      document.getElementById("sidebar-content").style.display === "block"
    ) {
      document.getElementById("main_content").style.opacity = "0.1";
    } else {
      document.getElementById("main_content").style.opacity = "1";
    }
  });


  return (
    <UserContext.Provider
      value={[
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
        setProduct,
      ]}
    >
      <>
        <Header />
        <Outlet />
        {toastMessage ? (
          <Modal style={{ visibility: "hidden" }} show={showToast}>
            <Toast
              style={{ visibility: "visible" }}
              className="m-0"
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide
            >
              <ToastSuccess text={toastMessage} />
            </Toast>
          </Modal>
        ) : null}
      </>
    </UserContext.Provider>
  );
};

export default TeerexStore;
