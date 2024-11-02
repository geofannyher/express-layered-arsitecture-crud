//service layer bertujuan untuk handle business logic
//kenapa dipisah ? supaya tanggung jawabnya ter isolate dan functionnya reusable
//reusable function == cleancode
const {
  findProduct,
  findProductById,
  editProductById,
  deleteProduct,
  insertProduct,
} = require("./product.respository");

const getAllProducts = async () => {
  const product = await findProduct();
  return product;
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    throw Error("Product not found");
  }
  return product;
};

const createProduct = async ({ name, description, price, image }) => {
  const product = insertProduct({ name, description, price, image });
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const patchProductById = async ({ id, description, image, name, price }) => {
  await getProductById(id);
  const data = await editProductById({ id, description, image, name, price });
  return data;
};

module.exports = {
  patchProductById,
  deleteProductById,
  createProduct,
  getProductById,
  getAllProducts,
};
