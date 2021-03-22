# LeitSpeed API

The LeitSpeed App back end. Built with Node and Express.

### Contributors

| [<img alt="ashley-bergsma" src="https://avatars.githubusercontent.com/u/65979049?v=4&s=117 width=117">](https://github.com/ashley-bergsma) |
| :----------------------------------------------------------------------------------------------------------------------------------------: |
|      [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ashleybergsma89/)      |
|                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ashley-bergsma)                         |

| [<img alt="HarrisonMS" src="https://avatars.githubusercontent.com/u/54726103?v=4&s=117 width=117">](https://github.com/HarrisonMS) |
| :--------------------------------------------------------------------------------------------------------------------------------: |
|  [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/harrison-seaborn)  |
|                      [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/harrisonMS)                       |

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

- '/users/' - GET all users
  Returns a data array containing information about all users (this includes password! Big no-no! Must fix later)

### Things I've learned along the way:

1. I failed to add my database file (with .db3 extension) to the gitignore at the beginning of the project, as a consequence it was added to the repo on github, which we don't want.

To fix this I stopped committing any changes to that file specifically, and made sure it was in the .gitignore file

Finally, I cleared the cache (what does this do exactly?), which successfully ignored the db files in the project

2. Dotenv Package

When I initially deployed this API on heroku the build was successful, and when opening the App there was the "Up and running..." message of the / route's handler... but that was it.

Looking at past projects, that were deployed and used, I tried to track down what I did differently to get them to work. I noticed `dotenv` pretty quickly - a package I totally forgot about.
