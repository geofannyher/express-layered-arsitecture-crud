//layer ini untuk mengkontrol request dan response termasuk logic type dari response
//biasnya juga handle validasi body

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  patchProductById,
  deleteProductById,
} = require("./product.service");
const { resFormat } = require("../../response/response");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(201).send(
    resFormat({
      status: 201,
      message: products,
    })
  );
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send(
      resFormat({
        status: 400,
        message: error.message,
      })
    );
  }
});

router.post("/", async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const product = await createProduct({ description, name, price, image });
    res.status(201).send(
      resFormat({
        status: 201,
        message: product,
      })
    );
  } catch (error) {
    res.status(400).send(
      resFormat({
        status: 400,
        message: error.message,
      })
    );
  }
});

router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  if (typeof productId !== "number") {
    return res.status(400).send(
      resFormat({
        status: 400,
        message: "id must be a number",
      })
    );
  }
  try {
    await deleteProductById(productId);
    res.status(201).send(
      resFormat({
        status: 201,
        message: "success delete product",
      })
    );
  } catch (error) {
    res.status(400).send(
      resFormat({
        status: 400,
        message: error.message,
      })
    );
  }
});

router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { description, price, image, name } = req.body;
  try {
    const product = await patchProductById({
      id,
      description,
      price,
      image,
      name,
    });
    res.status(201).send(
      resFormat({
        status: 201,
        message: product,
      })
    );
  } catch (error) {
    res.status(201).send(
      resFormat({
        status: 201,
        message: error.message,
      })
    );
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { description, name, image, price } = req.body;

  if (typeof id !== "number") {
    return res.status(400).send(
      resFormat({
        status: 400,
        message: "id must be a number",
      })
    );
  }

  if (!(description && price && image && name)) {
    return res.status(400).send(
      resFormat({
        status: 400,
        message: "field must be required",
      })
    );
  }
  try {
    const product = await patchProductById({
      id,
      description,
      price,
      image,
      name,
    });
    res.status(201).send(
      resFormat({
        status: 201,
        message: product,
      })
    );
  } catch (error) {
    res.status(201).send(
      resFormat({
        status: 201,
        message: error.message,
      })
    );
  }
});

module.exports = router;
