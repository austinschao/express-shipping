"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const request = require("supertest");
const app = require("./app");



const {
  shipProduct, SHIPIT_SHIP_URL,
} = require("./shipItApi");

afterAll( function (){
  axiosMock.reset();
})

test("shipProduct", async function () {
  
    axiosMock.onPost(SHIPIT_SHIP_URL)
      .reply( { "shipped" : 1001 } );

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual( { "shipped" : 1001 } );
});

// test(" mock shipProduct", async function (){


//   const res = await shipProduct({    
//                                 productId: 1000,
//                                 name: "Test Tester",
//                                 addr: "100 Test St",
//                                 zipcode: "12345-6789"});
//     expect(res).toEqual(1001);
// })

