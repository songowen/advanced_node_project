import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  //findAllProducts
  findAllProducts = async () => {
    // ORM인 Prisma에서 Products 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const products = await prisma.products.findMany();

    return products;
  };
  //createProduct
  create = async (title, price, content, userId, status) => {
    const createdProduct = await prisma.products.create({
      data: {
        title,
        price,
        content,
        userId,
        status,
      },
    });
    return createdProduct;
  };
  //findProductById
  findProductById = async (productId) => {
    const product = await prisma.products.findUnique({
      where: {
        productId: +productId,
      },
    });
    return product;
  };

  //updateProduct
  updateProduct = async (productId, title, price, content) => {
    const updatedProduct = await prisma.products.update({
      where: {
        productId: +productId,
      },
      data: {
        title,
        price,
        content,
      },
    });
    return updatedProduct;
  };

  //deleteProduct
  deleteProduct = async (productId) => {
    const deletedProduct = await prisma.products.delete({
      where: {
        productId: +productId,
      },
    });
    return deletedProduct;
  };
}
