// This is for adding the item to the cart
export const addCart = product => {
  return {
    type: "ADDCART",
    payload: product
  }
}

// This is for deleting an item from the cart
export const deleteCart = product => {
  return {
    type: "DELETEITEM",
    payload: product
  }
}
