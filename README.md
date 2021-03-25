# LeitSpeed API

<div id="top"></div>

## Table of Contents

### User registration and login

- Endpoints that do _**NOT**_ require authentication (Not Protected):

| Requests                                    | Endpoints                            | Description                                                                 |
| ------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| <a href="#baseUrl">GET Base URL</a>         | https://leitspeed-api.herokuapp.com/ | Attach endpoints to the end of the base URL in order to make HTTP Requests. |
| <a href="#googleLogin">GET google login</a> | /auth/google                         | <b>GET</b> request to register and login new user useing Google email       |

The LeitSpeed API is built with NodeJS & the Express framework, and the Knex query-builder.

## Tech Stack

Dependencies:

- Node
- Express
- Knex
- Sqlite3

Dev Dependencies:

- Nodemon
- Jest
- SuperTest
- Dotenv

## Using the API

<div id="baseUrl"></div>

**BASE URL**

The api can be accessed via the base url at [https://leitspeed-api.herokuapp.com/](https://leitspeed-api.herokuapp.com/)

If the deployment is up, you will receive a simple message - `"Up and running..."`

![Base url in Insomnia](https://i.ibb.co/gWpHMGq/leitspeed-base-URL.jpg)

## Auth endpoints

<div id="googleLogin"></div>
<a href="#top">Return to the top</a>

**[GET] Login For Google User**

The `/auth/google` GET request to the [https://leitspeed-api.herokuapp.com/auth/google](https://leitspeed-api.herokuapp.com/auth/google) endpoint.

![goole login pop up window](https://i.stack.imgur.com/N5v1U.png)

## API Endpoints

**/CARDS - GET all Cards - endpoint**

The `Cards` database table can be accessed by making a GET request to the [https://leitspeed-api.herokuapp.com/cards](https://leitspeed-api.herokuapp.com/cards) endpoint.

The response will be an array of objects - each object being an individual card in the database.

![Cards endpoint in Insomnia](https://i.ibb.co/7y08rcv/leitspeed-cards-URL.jpg)

---

**/CARDS/{id} - GET card by card ID - endpoint**

This API follows RESTful standards, using the `/cards` and `/cards/{id}` when working with one resource and a collection of resources. A card can be requested by its ID (given by the Node/Express server) - if it exists and hasn't been deleted, one JSON object will be delivered in the response. If the card can't be found a 404 will return.

A card can be accessed by making a GET request to the `https://leitspeed-api.herokuapp.com/cards/:id` endpoint with the requested card id following the last forward slash. Example: `https://leitspeed-api.herokuapp.com/cards/1`

![Cards url with id in Insomnia](https://i.ibb.co/2d1n9G7/leitspeed-card-ID.jpg)

---

**/CARDS/ADD-CARD - POST a new card - endpoint**

To add a new card, make a POST request to the [https://leitspeed-api.herokuapp.com/cards/add-card](https://leitspeed-api.herokuapp.com/cards/add-card) endpoint.

The request body will pass the new card's information - some of these fields are optional, others are not.

- ❗ Required fields:

  - front: The front of the new flashcard - the question, or whatever format the user wants to use to structure their study.
  - back: The back of the card - the answer

- ❓ Optional fields:
  - user_id: integer value, this field is a FOREIGN KEY linking to the `Users` database table
  - notes: text (string) field is where a user can add an additional note to their card, like a memory trick, etc.
  - public: boolean value - indicating if the card can be shared with other users
  - active: boolean value - indicating if the user is currently studying the card

The data structure of the request body should look as follows, in JSON format:

```
{
	"user_id": integer,
	"front": "text",
	"back": "text",
	"notes": "text",
	"active": boolean,
	"public": boolean
}
```

![Add-card url in Insomnia](https://i.ibb.co/wBDHSqY/leitspeed-add-Card.jpg)

If the card meets all the requirements and is added to the `Cards` database table, it will respond with a JSON object containing the newly created card.

---

**/{id} - PUT request to UPDATE a card - endpoint**

To update an existing card, make a PUT request with the card's id injected into the route parameters to the `https://leitspeed-api.herokuapp.com/cards/:id` endpoint. The format must be in JSON (see the example above), and the `id`, `front` and `back` of a card **must** be given (even if they are not changing).

The server will respond with the newly updated card object.

![Put request in Insomnia](https://i.ibb.co/hfwd5Yp/leitspeed-update-Card.jpg)

---

### Database Design Overview

🚧 UNDER CONSTRUCTION 🚧

## Contributors

| [<img alt="ashley-bergsma" src="https://avatars.githubusercontent.com/u/65979049?v=4&s=117 width=117">](https://github.com/ashley-bergsma) |
| :----------------------------------------------------------------------------------------------------------------------------------------: |
|                                            [ashley-bergsma](https://github.com/ashley-bergsma)                                             |

| [<img alt="HarrisonMS" src="https://avatars.githubusercontent.com/u/54726103?v=4&s=117 width=117">](https://github.com/HarrisonMS) |
| :--------------------------------------------------------------------------------------------------------------------------------: |
|                                            [HarrisonMS](https://github.com/HarrisonMS)                                             |
