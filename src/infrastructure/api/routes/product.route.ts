import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();


productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(await new ProductRepository());

    try {
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        }

        const output = await useCase.execute(productDto);
        console.log(output);
        res.send(output);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

productRoute.get("/", async (req: Request, res: Response) => {

    const useCase = new ListProductUseCase(await new ProductRepository());
    const output = await useCase.execute({});
    res.send(output);
})