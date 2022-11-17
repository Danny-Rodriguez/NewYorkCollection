import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
// const jsonProducts = require("../products.json")

function Products() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)
  let componentMounted = true

  // fetch("/data.json")
  //   .then(response => response.json())
  //   .then(json => console.log("data", json))

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      // const response = await fetch("http://fakestoreapi.com/products")
      const response = await fetch("/products.json")
      // .then(res => res.json())
      // .then(data => console.log(data))
      // .then(res => setData(await res.clone().json()))
      // .then(res => setFilter(await data.json()))
      // const prod = fetch("../products.json")
      // console.log(response.json())
      // console.log(response)
      if (componentMounted) {
        setData(await response.clone().json())
        setFilter(await response.json())
        // setData(await data.clone().json())
        // setFilter(await data.json())

        setLoading(false)
        console.log(filter)
      }
      return () => {
        componentMounted = false
      }
    }
    getProducts()
  }, [])

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    )
  }

  const filterProduct = cat => {
    console.log(data)
    const updatedList = data.filter(x => x.category === cat)
    setFilter(updatedList)
  }

  const ShowProducts = () => {
    // const getPrice2 = price => {
    //   // if (!price) {
    //   //   return
    //   // }
    //   if (price === 9.99) {
    //     return (price = 799.99)?.toFixed(2)
    //   }
    //   if (price === 10.99) {
    //     return (price = 299.99)?.toFixed(2)
    //   }
    //   if (price === 168.0) {
    //     return (price = 1299.99)?.toFixed(2)
    //   }
    //   if (price === 109.95) {
    //     return (price = 109.99)?.toFixed(2)
    //   }
    //   if (price === 22.3) {
    //     return (price = 22.99)?.toFixed(2)
    //   }
    //   return price?.toFixed(2)
    // }
    return (
      <>
        <div className="category buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>
            Men's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>
            Jewelry
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>
            Electronics
          </button>
        </div>
        {filter.map((product, idx) => (
          <div className="col-md-4 col-lg-3 mb-4" key={idx}>
            <div className="card h-100 text-center p-5" key={product.id}>
              <img src={product.image} className="allProducts card-img-top" alt={product.title} height="250px" />
              <div className="card-body">
                {/* <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5> */}
                <h5 className="card-title mb-0">{product.title.substring(0, 12)}</h5>
                {/* <p className="card-text lead fw-bold">${product.price?.toFixed(2)}</p> */}
                <p className="card-text lead fw-bold">${product.price}</p>
                <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
      </div>
      <div className="text-center">
        <a href="#" className="btn px-5 text-uppercase">
          <i className="bi bi-arrow-up-circle h1"></i>
        </a>
      </div>
    </div>
  )
}

export default Products
