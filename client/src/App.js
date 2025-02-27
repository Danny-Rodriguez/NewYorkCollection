import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

function App() {
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = product => {
    let newCart = [...cart];
    let itemInCart = newCart.find(item => product.id === item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = { ...product, quantity: 1 };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  const removeFromCart = productToRemove => {
    // console.log("productToRemove", productToRemove)
    setCart(cart.filter(product2 => product2 !== productToRemove));
  };

  const removeOneFromCart = product => {
    let newCart = [...cart];
    let itemInCart = newCart.find(item => product.id === item.id);
    // console.log("itemInCart", itemInCart)

    if (itemInCart) {
      if (itemInCart.quantity === 1) {
        return removeFromCart(product);
      }
      itemInCart.quantity--;
    }
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  return (
    <>
      <Navbar cart={cart} getCartTotal={getCartTotal} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product cart={cart} addToCart={addToCart} />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route path="cart" element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} removeOneFromCart={removeOneFromCart} getCartTotal={getCartTotal} />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
