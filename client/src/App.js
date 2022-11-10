import { useState, useEffect } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
// import { Switch, Route } from "react-router-dom"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"
import Cart from "./components/Cart"
import Footer from "./components/Footer"
import About from "./pages/About"

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

// {product, quantity: 1, stripe: "price_" }

const fakeToStripe = [
  {
    id: 1,
    stripe: "price_1M1NDpBaMzTOCf21hfyp4EEU"
  }
]

function App() {
  const [cart, setCart] = useState(cartFromLocalStorage)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = product => {
    // setCart([...cart, { ...product}])
    console.log({ product })
    // setCart([...cart, { {...product}, quantity: 1} ])
    // setCart([...cart, { ...product, quantity: 1 }])
    //@ -----------------------------------/>
    let newCart = [...cart]
    // let itemInCart = newCart.find(item => product.name === item.name)
    let itemInCart = newCart.find(item => product.id === item.id)
    if (itemInCart) {
      itemInCart.quantity++
    } else {
      itemInCart = { ...product, quantity: 1 }
      newCart.push(itemInCart)
    }
    setCart(newCart)
  }

  const removeFromCart = productToRemove => {
    setCart(cart.filter(product2 => product2 !== productToRemove))
  }

  const removeOneFromCart = product => {
    let newCart = [...cart]
    let itemInCart = newCart.find(item => product.id === item.id)
    console.log("itemInCart", itemInCart)

    if (itemInCart) {
      if (itemInCart.quantity === 0) {
        console.log("itemInCart", itemInCart)
        // removeFromCart(itemInCart)
        // setCart(cart.filter(product2 => product2 !== itemInCart))
        itemInCart.remove()
      }
      itemInCart.quantity--
    } else {
      removeFromCart(product)
    }

    // else {
    //   itemInCart = { ...product, quantity: 1 }
    //   newCart.push(itemInCart)
    // }
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((sum, { quantity }) => sum + quantity, 0)
  }

  return (
    <>
      <Navbar cart={cart} getCartTotal={getCartTotal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product cart={cart} addToCart={addToCart} />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="cart" element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} removeOneFromCart={removeOneFromCart} getCartTotal={getCartTotal} />} />
        <Route path="about" element={<About />} />
      </Routes>
      {/* <Home /> */}
      <Footer />
    </>
  )
}

export default App
