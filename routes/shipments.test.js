"use strict";

const request = require("supertest");
const app = require("../app");

/** POST /shipments - Add a shipment  */
describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.productId must be greater than or equal to 1000"
        ],
        "status": 400
      }
    });
  });
});
