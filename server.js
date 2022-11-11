const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/.env.local" })
const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`)
const bodyParser = require("body-parser")
const fakeToStripe = require("./fakeToStripe").fakeToStripe

// console.log("fake", fakeToStripe)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static("public"))
// app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

// Node serves the static files for built app
app.use(express.static(path.resolve(__dirname, "./client/build")))
// Handle GET requests for /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

app.post("/checkout", async (req, res) => {
  console.log("fake", fakeToStripe)
  console.log(req.body.items)
  const items = req.body.items
  let lineItems = []
  items.forEach(item => {
    lineItems.push({
      // price: item.id,
      price: fakeToStripe[item.id],
      quantity: item.quantity
    })
  })
  console.log("lineItems", lineItems)

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  })

  res.send(
    JSON.stringify({
      url: session.url
    })
  )
})

app.listen(4000, () => console.log("listening on port 4000"))
