# LeitSpeed API 
The LeitSpeed App back end. Built with Node and Express.

### Tech Stack 

Node 
Express 
BcryptJS
Knex 
Sqlite3 

Nodemon (dev dependency)

### Database Design 

[database schema picture here]

Users Table 

Users must provide their name, email, and chosen username. They will be given a unique ID. 

Cards Table 

Required fields for a new flashcard are as follows:
- user_id: A user's id is attached as a foreign key, automatically assigned on the front end 
- id: Primary key assigned by the database 
- Front of card: The text/question the user wants on the front of the card
- Back of card: The answer text the user gives for the back of the card 
- Subject: A string tag that organizes cards by their subject
- Public: A boolean value indicating the public status, if a card is public other users can see and add it to their own stacks

Optional fields for a new card are as follows: 
- Notes: User can add additional notes to a card, this is a text input
- Active: A boolean value indicating the active status of a card. An active card is currently being studied by the student, and appears in review games and 'Study Mode'. Inactive cards will not be actively used in Study Mode. 

### Endpoints Under Construction 

'/cards' 
- Returns all cards in the database - active or inactive 

'/users/cards'


