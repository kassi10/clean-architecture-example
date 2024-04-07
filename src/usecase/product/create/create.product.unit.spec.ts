import { CreateProductUseCase } from "./create.product.usecase";


const input = {
    type: 'a',
    name: "Product 1",
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}


describe("Unit test for create product use case", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("should throw an error when name is missing", async () => {

        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        // const input1 = {...input}
        input.name = "";

        await expect(createProductUseCase.execute(input)).rejects.toThrow("product: Name is required");
    
    })

    it("should throw an error when price is less than zero", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name =  "Product 1";
        input.price = -30;

        await expect(createProductUseCase.execute(input)).rejects.toThrow("product: Price must be greater than zero")
    })
})