import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";




describe("Unit test list product use case", () => {
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
    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const product1 = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = {
            products: [
                {
                    id: product1.id,
                    name: product1.name,
                    price: product1.price
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price
                }
            ]
        }

        const result = await listProductUseCase.execute({});

        expect(result.products.length).toEqual(2);
        expect(output).toEqual(result);
    })
})