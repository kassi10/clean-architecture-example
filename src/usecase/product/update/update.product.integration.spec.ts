import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";



describe("Product update unit test", () => {
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
    it("should update a product", async () => {

        const product = new Product('a', "Product 1", 100)
        const productRepository = new ProductRepository();
        productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product 22",
            price: 400
        };

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    })
})