import React, { useState, useEffect } from "react";
import Topnav from "./Components/Topnav";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home'
import ProductPage from './Components/ProductPage';
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Wishlist from "./Components/Wishlist";
import { Puff } from "react-loader-spinner";

function App() {

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    window.addEventListener("beforeunload",() => {
      setLoading(true);
    })
  }, []);

  return (
    <>

      {
        loading ?
          <>
            <div className="loader">
              <Puff />
            </div>
          </> :
          <>
            <Topnav setSearch={setSearch} search={search} />
            <Routes>
              <Route path="/" element={<Home  setSearch={setSearch} search={search}  />} />
              <Route path="/:title" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </>
      }
    </>
  );
}

export default App;
