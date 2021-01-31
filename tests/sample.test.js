describe('Sample test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true); 
    })
})

/* -------------------------------------------------------------------------- */
/*                                Notes on Jest                               */
/*  Jest recognizes tests in one (or more) of three ways: 
    - files w/ extension .test.js
    - files w/ extension .spec.js
    - All files inside __tests__ folder or directory 

    To test the end points, we need them to make a req to the database 
    For that reason we'll set up a TESTING DATABASE - we'll be dropping the database each time we run a test 
    Doing this ensures the integrity of the test! 
*/
/* -------------------------------------------------------------------------- */