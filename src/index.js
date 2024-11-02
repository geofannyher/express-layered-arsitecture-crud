const express = require("express");
// const dotenv = require("dotenv");

const app = express();
app.use(express.json());

// const PORT = process.env.PORT;

// dotenv.config();
const productController = require("./product/product.controller");
app.use("/product", productController);

app.get("/test", (req, res) => {
  res.send("test");
});
app.listen(2000, () => {
  console.log("listen in port", 2000);
});
