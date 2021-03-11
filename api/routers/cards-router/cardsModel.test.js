// const server = require('../../server'); 
// const request = require('supertest'); 

// ! Testing the cards MODEL 
// requiring connection (dbConfig) file 
const db = require('../../../data/connection'); 
// require the model we wish to test 
const cards = require('./cards-model'); 

const cardData = {
    "front": "new question", 
    "back": "new answer", 
    public: true, 
    active: false
}; 

describe("cards model", () => {
    // before each test we want to start with a fresh database 
    // remember, this will be async 
    beforeEach(async () => {
        await db('cards').truncate(); 
    }); 

    describe("add function", () => {
        it("inserts cards into the database", async () => {
            // so that we can call it again later, and request from the db as needed, declare cardNumber as a let 
            let cardNumber; 
            cardNumber = await db('cards'); 
            expect(cardNumber).toHaveLength(0); 
            // add a card 
            await cards.add(cardData); 
            // now that a card has been added, we'll have to await a new request 
            cardNumber = await db('cards'); 
            expect(cardNumber).toHaveLength(1); 
        })
        // we know that the add function is supposed to return a card object in the response, let's test if it does that 
        it("inserts and returns a card added to the database", async () => {
            let card = await cards.add(cardData); 
            expect(card.front).toBe("new question")
        })
    }); 

    //TODO write tests for UPDATE function 
});

// // Sanity check test for Jest! 
// describe('Sample test', () => {
//     it('should test that true === true', () => {
//         expect(true).toBe(true); 
//     })
// })

// describe('GET /', () => {
//     it('should return 200 OK', async () => {
//         const expectedStatus = 200; 

//         const response = await request(server).get('/cards'); 

//         expect(response.status).toEqual(expectedStatus); 
//             // using Regex to identify application/json content-type header 
//             //.expect('Content-Type', /json/); 
//     }); 
// })