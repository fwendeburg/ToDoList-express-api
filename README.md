# ToDoList-api
A REST API for a todo list app.

## Features
- User, Task and Project models with CRUD operations.
- Separate route for each model.
- Authentication using JWT.

## Tech Stack
Node.js, Typescript, Javascript, MongoDB

## Documentation
### Responses
| **HTTP Response Code**  | **Meaning**                                                                     |
|-------------------------|---------------------------------------------------------------------------------|
| 200 - OK                | Everything worked as epected.                                                   |
| 400 - Bad Request       | The request was unacceptable, most likely due to missing a required parameter.  |
| 401 - Unauthorized      | You need to be authenticated to make this request (missing bearer token).       |
| 422 - Validation Error  | The parameters passed in the request body failed validaiton.                    |
| 500 - Server Error      | Something went wrong on the server side.                                        |

### `User`

### `Project`

### `Task`

WORK IN PROGRESS.

## Tests
All endpoints have error handling and have been tested.

## Run Locally
Clone the project

```bash
  git clone https://github.com/fwendeburg/ToDoList-api.git
```

Go to the project directory

```bash
  cd ToDoList-api
```

Install dependencies

```bash
  npm install
```

Generate the RSA public and private keys (for authentication)

```bash
  cd authentication
  node generateKeyPairs.js 
```

Start the server

```bash
  npm run start
```

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`PORT` the port at which the app will listen to requests.

`DB_URI` the URI for the db connection.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Authors
- [@fwendeburg](https://www.github.com/fwendeburg)
