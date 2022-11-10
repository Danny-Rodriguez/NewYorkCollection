import { useSelector } from "react-redux"
// import Product from "./Product"
import Product from "../pages/Product"

//onClick={() => handleButton(product)}

function Cart({ cart, addToCart, removeFromCart, clearCart, removeOneFromCart, getCartTotal }) {
  console.log(cart)

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({ items: cart.items })
      body: JSON.stringify({ items: cart })
    })
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response.url) {
          window.location.assign(response.url) //forwarding user to stripe
        }
      })
  }

  // const getTotalSum = () => {
  //   return cart.reduce((sum, { price }) => sum + price, 0)
  // }
  const getTotalSum = () => {
    return cart.reduce((sum, { price }) => sum + price, 0)
    console.log("cart length", cart.length)
  }

  return (
    <>
      <h1 className="mt-3 text-center d-flex justify-content-center">
        Cart <p className="text-muted">&nbsp;({getCartTotal()}) items</p>{" "}
      </h1>
      <div className="d-flex justify-content-center">
        <div className="cartList d-flex flex-column">
          {cart.map((product, idx) => (
            <div className="row cartRow" key={idx}>
              <div className="d-flex justify-content-center align-items-center">
                <img className="cartImg" src={product.image} alt={product.title} height="200px" width="180px" />
                {/* </div> */}
                {/* <div className="col-md-6"> */}
                <div className="col-md-3">
                  <h3>{product.title}</h3>
                  {/* <p className="lead fw-bold">
                    {product.quantity} X ${product.price} = ${product.quantity * product.price}
                  </p> */}
                  <div>Quantity: {product.quantity}</div>
                  <p>Price: {product.price}</p>
                  <button className="btn btn-outline-dark me-4" onClick={() => removeFromCart(product)}>
                    <i className="fa fa-minus"></i>
                  </button>
                  <button className="btn btn-outline-dark me-4" onClick={() => removeOneFromCart(product)}>
                    <i className="fa fa-minus"></i>
                  </button>
                  <button className="btn btn-outline-dark" onClick={() => addToCart(product)}>
                    <i className="fa fa-plus"></i>
                  </button>
                  {/* <h4 className="text-center">{product.quantity}</h4> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
        {cart.length !== 0 ? (
          <div className="d-flex flex-column">
            <div className="cartSum d-flex flex-column">
              <div className="items">Items: {getCartTotal()}</div>
              <div className="shipping">Shipping: *Free*</div>
              <div>
                <div className="total">
                  {" "}
                  {/* <br /> Total: $xx.xx */}
                  <br /> Total: ${getTotalSum()}
                </div>
                <br />
                <a className="btn btn-dark" onClick={checkout}>
                  Go to Check Out
                </a>
              </div>
              <button className="clear btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
            {/* <div className="test-dummy">
              <p>Use this test-dummy card to complete your mock order!</p>
              <img src="/assets/test-dummy-card.png" alt="" width="300" />
            </div> */}
          </div>
        ) : (
          <h1 className="text-center">Checkout the shop and find your style!</h1>
        )}
      </div>
    </>
  )
}

export default Cart
