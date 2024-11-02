// berkomunikasi dengan database
// Boleh pake ORM boleh raw Query
const prisma = require("../db");

const findProduct = async () => {
  const products = await prisma.products.findMany();

  return products;
};

const deleteProduct = async (id) => {
  await prisma.products.delete({
    where: {
      id,
    },
  });
};
const findProductById = async (id) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const insertProduct = async ({ name, description, price, image }) => {
  const product = await prisma.products.create({
    data: {
      name,
      description,
      price,
      image,
    },
  });
  return product;
};
const editProductById = async ({ id, description, image, name, price }) => {
  const product = await prisma.products.update({
    where: {
      id,
    },
    data: {
      description,
      image,
      name,
      price,
    },
  });
  return product;
};

module.exports = {
  findProduct,
  deleteProduct,
  findProductById,
  insertProduct,
  editProductById,
};
