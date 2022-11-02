import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
// import { Switch, Route } from "react-router-dom"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
      </Routes>
      {/* <Home /> */}
    </>
  )
}

export default App
