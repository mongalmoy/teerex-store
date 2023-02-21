import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import TeerexStore from "./pages/TeerexStore";
import Home from "./pages/Home";
import { Link, BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./pages/Body";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TeerexStore />}>
            <Route index element={<Home />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
