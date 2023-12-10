import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  // 모든 상품 조회
  findAllProducts = async () => {
    //저장소에 데이터 요청
    const products = await this.productsRepository.findAllProducts();

    //상품 최신순으로 정렬(내림차순)
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    //password, content를 뺀 상태로 controller에게 response 전달
    return products.map((product) => {
      return {
        productId: product.productId,
        title: product.title,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  // 상품 생성
  create = async (title, price, content, userId, status) => {
    //저장소에 데이터 요청
    const createdProduct = await this.productsRepository.createProduct(
      title,
      price,
      content,
      userId,
      status,
    );
    //비지니스 로직 수행 후 사용자에게 보여줄 데이터 가공
    return product;
  };

  findById = async (productId) => {
    // 저장소에 데이터 요청
    const product = await this.productsRepository.findProductById(productId);

    return {
      productId: product.productId,
      nickname: product.nickname,
      title: product.title,
      price: product.price,
      content: product.content,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  //개시글 수정
  update = async (productId, title, price, content) => {
    //저장소에 특정 게시글 하나 요청
    const product = await this.productsRepository.findProductById(productId);

    if (!product) throw new Error('존재하지 않는 게시물입니다.');

    //저장소에 데이터 수정 요청
    await this.productsRepository.updateProduct(
      productId,
      title,
      price,
      content,
    );

    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
    );

    return {
      productId: updatedProduct.productId,
      title: updatedProduct.title,
      price: updatedProduct.price,
      content: updatedProduct.content,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };
  };
  //게시글 삭제
  delete = async (productId) => {
    //저장소에 특정 게시글 하나 요청
    const product = await this.productsRepository.findProductById(productId);

    if (!product) throw new Error('존재하지 않는 게시물입니다.');

    await this.productsRepository.deleteProduct(productId);
    return {
      productId: product.productId,
      title: product.title,
      price: product.price,
      content: product.content,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };
}
