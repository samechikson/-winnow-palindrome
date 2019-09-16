# Winnow Palindrome Problem 

## Solution overview

This application uses a microservices architecture to compute palindromes inside a given piece of text. It consists of the following components:

![Winner Microservices](./WinnowPalindrome.png)
___

1. __API Service__ (NodeJS + Express) - Entry point for the application. It exposes two endpoints:
    - `POST /palindrome` Queues a palindrome problem to be computed (See example below). It attemps to match on the given text, and if it does, it will return the result of a problem that was already computed.
    - `GET /palindrome/{taskId}` Get a palindrome problem by taskId if it has already been sent to the server.
2. __Queue__ (Redis) - Holds palindrome problems 
3. __Palindrome Processing Service__ (NodeJS) - Picks palindrome problems off the queue, processes them to find a solution, saves the solution to the database.
4. __DB__ (MongoDB) - persistence layer which holds existing palindrome problems

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Docker and `docker-compose`

### Running

Pull this repository onto your local and 

```
docker-compose up
```

The API will expose port 3000 with the endpoints defined above.

```
curl -X POST \
  http://localhost:3000/palindrome \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "I am anna"
}'
```
should return something like
```json
{
    "timestamps": {
        "submitted": 1568564742614,
        "started": 1568564742629,
        "completed": 1568564742649
    },
    "problem": {
        "text": "I am anna"
    },
    "solution": {
        "largestPalindrome": "anna",
        "largestPalindromeLength": 4
    },
    "_id": "5d7e6606c9697636601efbcb",
    "status": "completed",
    "__v": 0
}
```

## Running the tests

Each project has its own unit tests:

1. `./api`  
2. `./palindrome-service`

`cd` into the project and run `npm run test`. Prerequisite: Node and NPM installed on local machine.

## Built With

* [Node + NPM](https://nodejs.org/en/) - Server Side Framework
* [ExpressJS](https://expressjs.com/) - API Web Framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Redis](https://redis.io/) - Queue with Pub/Sub
