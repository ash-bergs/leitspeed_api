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

const cardUpdates = {
    "id": 1,
    "front": "newer question", 
    "back": "newer answer"
}

describe("cards model", () => {
    // before each test we want to start with a fresh database 
    // remember, this will be async 
    beforeEach(async () => {
        await db('cards').truncate(); 
    }); 

    describe("add function", () => {
        it("inserts new card in database", async () => {
            // so that we can call it again later, and request from the db as needed, declare cardNumber as a let 
            let cardNumber; 
            cardNumber = await db('cards'); 
            expect(cardNumber).toHaveLength(0); 
            // add a card 
            await cards.add(cardData); 
            // now that a card has been added, we'll have to await a new request 
            cardNumber = await db('cards'); 
            expect(cardNumber).toHaveLength(1); 
        });

        it("auto-assigns id num to new card", async () => {
            let cardId; 
            response = await db('cards'); 
            expect(response).toHaveLength(0); 

            await cards.add(cardData); 

            response = await db('cards'); 
            expect(response).toHaveLength(1); 
            // grab the first element in the response array 
            cardId = response[0].id; 
            // assert that it will have id ONE (1) because it was the first added card, and the db should assign id incrementally 
            expect(cardId).toEqual(1);
        });
        // we know that the add function is supposed to return a card object in the response, let's test if it does that 
        it("returns new card", async () => {
            let card = await cards.add(cardData); 
            expect(card.id).toEqual(1);
            expect(card.front).toBe("new question");
            expect(card.back).toBe("new answer"); 
        });
    }); 

    //TODO write tests for UPDATE function 
    //TODO Comment clean up

//     describe("update function", () => {
//         it("updates a card", async () => {
            // * Will need to set up a call to add a card to the database 

            //* then get that card 

            //* isolate the front of the card, and update 

            //* check that response contains the card (.toHave) the new changes, but the same id 
//         })
//     })
});

// * Jest disables console logs (supresses them, rather), which can be disabled with command option:
// * npm test -- --silent=false (at runtime)
// console.log(cardId); 