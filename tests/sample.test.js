// Requiring the server file... for obvious reasons 
const server = require('../api/server'); 
// Pull in SuperTest! Now using 'require' we can call the package and its functions 
const request = require('supertest'); 

// Sanity check test for Jest! 
describe('Sample test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true); 
    })
})

// Sanity check test for SuperTest 

describe('GET /', () => {
    it('has process.env.DB_ENV as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing'); 
    })
})

/* -------------------------------------------------------------------------- */
/*                                Notes on Jest                               */
/*  Jest recognizes tests in one (or more) of three ways: 
    - files w/ extension .test.js
    - files w/ extension .spec.js
    - All files inside __tests__ folder or directory 

    To test endpoints, we need them to make a req to the database 
    For that reason we'll set up a TESTING DATABASE - we'll be dropping the database each time we run a test 
    Doing this ensures the integrity of the test! 

    We'll be using supertest to help us test the endpoints. 
    Cross-env is another dev dependency, used to handle environment variables (?) in a testing suite 

    ? How do we test the model - Follow Along  
    * Video that helped me set up my testing environment: https://www.youtube.com/watch?v=5V0sWOqTw2I 
    Lambda class video by Gabriel Cabrejas 
    1. In the knexfile we will need to create a 'testing' object 
*/
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                               About SuperTest                              */
/*  Supertest is an npm package to test HTTP 
    ! We install it as a DEV DEPENDENCY 
    To use it, we will require(import) it at the top of our testing file, giving it an easy to use/remember variable name 
    To write a test for the base endpoint (which isn't really anything more than a server status message) we will call SuperTest, and CHAIN ASSERTIONS that we expect to see - like a 200 code! 
*/
/* -------------------------------------------------------------------------- */