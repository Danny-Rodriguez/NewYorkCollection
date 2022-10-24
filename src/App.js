import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import { Routes, Route } from "react-router-dom"
// import { Switch, Route } from "react-router-dom"
import Products from "./components/Products"
import Product from "./components/Product"

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/products" component={Products} />
//         <Home />
//       </Switch>
//     </>
//   )
// }

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
      {/* <Home /> */}
    </>
  )
}

export default App
