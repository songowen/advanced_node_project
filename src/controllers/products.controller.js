import { ProductsService } from "../services/products.service.js";

export class ProductsController {
  productsService = new ProductsService();


  //상품 생성
  create = async (req, res, next) => {
    try {

      const { title, price, content } = req.body;
      const userId = req.user.userId;

     await this.productsService.create({
        title,
        price,
        content,
        userId,
        status: 'FOR_SALE',
      });

      return res.status(201).json({ message:"상품이 생성되었습니다." });
    } catch (err) {
      next(err);
    }
  };

    //전체상품 조회
    findAll = async (req, res, next) => {
      try {
        const products = await this.productsService.findAll();
  
        return res.status(200).json({ data: products });
      } catch (err) {
        next(err);
      }
    };

  //상품 상세조회
  findById = async (req, res, next) => {
    try {
        const { productId } = req.params
      const product = await this.productsService.findById(productId);

      return res.status(201).json({ data: product });
    } catch (err) {
      next(err);
    }
  };
  //상품 수정
  update = async (req, res, next) => {
    try {
        const { productId } = req.params
        const { title, price, content, status } = req.body; 
        await this.productsService.update(Number(productId), req.user.userId ,{
        title,
        price,
        content,
        status
        });

      return res.status(201).json({ data: updatedProduct });
    } catch (err) {
      next(err);
    }
  };
  //상품 삭제
  delete = async (req, res, next) => {
    try {
        const { productId } = req.params       

         await this.productsService.delete(
          productId,            
        )

      return res.status(200).json({ data: deletedProduct });
    } catch (err) {
      next(err);
    }
  };
}
