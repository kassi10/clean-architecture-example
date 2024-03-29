import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 100);


describe("Unit test find product use case", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })
    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("123", "Product 1", 100);

        productRepository.create(product);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Product 1",
            price: 100
        }
        

        const findProductUsecase = new FindProductUseCase(productRepository);
        const result = await findProductUsecase.execute(input);

        expect(output).toEqual(result);
    })


})
