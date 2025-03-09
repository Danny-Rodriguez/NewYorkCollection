const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env.local" });
const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);
const bodyParser = require("body-parser");
const fs = require("fs");
const fakeToStripe = JSON.parse(fs.readFileSync("./fakeToStripe.json", "utf8"));

// console.log("fake", fakeToStripe)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Checkout endpoint
app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach(item => {
    lineItems.push({
      price: fakeToStripe[item.id],
      quantity: item.quantity
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
    // success_url: "https://monkfish-app-979yg.ondigitalocean.app/success",
    // cancel_url: "https://monkfish-app-979yg.ondigitalocean.app/cancel"
    // success_url: "https://newyorkcollection.shop/success",
    // cancel_url: "https://newyorkcollection.shop/cancel"
  });

  res.json({ url: session.url });
});

// Node serves the static files for built app
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Handle GET requests for /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// This should be the last route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
