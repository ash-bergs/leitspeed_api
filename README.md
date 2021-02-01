# LeitSpeed API 
The LeitSpeed App back end. Built with Node and Express.

### Tech Stack 

Dependencies: 
- Node 
- Express 
- BcryptJS
- Knex 
- Sqlite3 

Dev Dependencies:
- Nodemon 
- Jest 
- SuperTest 
- Cross-Env 

### Database Design 

[database schema picture here]

Users Table 

Users must provide their name, email, and chosen username. They will be given a unique ID. 

Cards Table 

Required fields for a new flashcard are as follows:
- user_id: A user's id is attached as a foreign key, automatically assigned on the front end 
- id: Primary key assigned by the database 
- Front: The text/question the user wants on the front of the card
- Back: The answer text the user gives for the back of the card 

Optional fields for a new card are as follows: 
- Notes: User can add additional notes to a card, this is a text input
- Active: A boolean value indicating the active status of a card. An active card is currently being studied by the student, and appears in review games and 'Study Mode'. Inactive cards will not be actively used in Study Mode. 
- Public: A boolean value indicating the public status, if a card is public other users can see and add it to their own stacks


### Endpoints Under Construction 

'/cards' 
- Returns all cards in the database - active or inactive 

'/users/cards'

* '/users/' - GET all users
Returns a data array containing information about all users (this includes password! Big no-no! Must fix later)

### Things I've learned along the way: 

1. I failed to add my database file (with .db3 extension) to the gitignore at the beginning of the project, as a consequence it was added to the repo on github, which we don't want. 
To fix this I stopped committing any changes to that file specifically, and made sure it was in the .gitignore file
Finally, I cleared the cache (what does this do exactly?), which successfully ignored the db files in the project 