import { app, sequelize } from "../express";
import request from "supertest";
import e from "express";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });
    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product 1",
                price: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);
    })

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Product 1",
            price: 10
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {

        const response1 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product 1",
                price: 10
            });
        expect(response1.status).toBe(200);
        const response2 = await request(app)
            .post("/product")
            .send({
                type: "b",
                name: "Product 2",
                price: 200
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products[0].name).toBe("Product 1");
        expect(listResponse.body.products[1].name).toBe("Product 2");
    })
})