import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const input = {
    type: 'a',
    name: "Product 1",
    price: 100
}


describe("Unit test for create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("should throw an error when name is missing", async () => {

        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        // const input1 = {...input}
        input.name = "";

        await expect(createProductUseCase.execute(input)).rejects.toThrow("product: Name is required");
    
    })

    it("should throw an error when price is less than zero", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name =  "Product 1";
        input.price = -30;

        await expect(createProductUseCase.execute(input)).rejects.toThrow("product: Price must be greater than zero")
    })
})