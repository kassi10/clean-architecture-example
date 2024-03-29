import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";


const product = ProductFactory.create('a', "Product 1", 100)

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
};

describe("Product update unit test", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
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