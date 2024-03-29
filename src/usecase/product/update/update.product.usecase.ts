import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        console.log(input)
        const product = await this.productRepository.find(input.id);
        await product.changeName(input.name);
        await product.changePrice(input.price);
        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}