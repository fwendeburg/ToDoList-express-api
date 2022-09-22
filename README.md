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
| **HTTP Response Code**  | **Description**                                                                 |
|-------------------------|---------------------------------------------------------------------------------|
| 200 - OK                | Everything worked as epected.                                                   |
| 400 - Bad Request       | The request was unacceptable, most likely due to missing a required parameter.  |
| 401 - Unauthorized      | You need to be authenticated to make this request (missing bearer token).       |
| 422 - Validation Error  | The parameters passed in the request body failed validaiton.                    |
| 500 - Server Error      | Something went wrong on the server side.                                        |

### `User`
| **Method** | **URL**   | **Description**                                       | **Authentication** |
|------------|-----------|-------------------------------------------------------|--------------------|
| POST       | /register | Registers a new user.                                 | not required       |
| POST       | /login    | Authenticates a user.                                 | not required       |
| GET        | /:userid  | Gets stored information about the authenticated user. | required           |
| PUT        | /         | Modifies stored user data.                            | required           |
| DELETE     | /         | Deletes the authenticated user from the database.     | required           |

### `Project`
| **Method** |   **URL**   | **Description**                                                                                                          | **Authentication** |
|------------|:-----------:|--------------------------------------------------------------------------------------------------------------------------|--------------------|
| GET        | /           | Returns list of all projects which owner is the authenticated user.                                                      | required           |
| GET        | /:projectid | Returns the stored information of the project with id "projectid" if the owner of the project is the authenticated user. | required           |
| POST       | /           | Saves a project in the database.                                                                                         | required           |
| PUT        | /:projectid | Modifies the data stored for the project with "projectid" id if the owner of the project is the authenticated user.      | required           |
| DELETE     | /:projectid | Deletes the data stored for the project with "projectid" id if the owner of the project is the authenticated user.       | required           |

### `Task`
| **Method** |  **URL** | **Description**                                                                                                 | **Authentication** |
|------------|:--------:|-----------------------------------------------------------------------------------------------------------------|--------------------|
| GET        | /        | Returns list of all tasks which owner is the authenticated user.                                                | required           |
| GET        | /:taskid | Returns the stored information of the task with id "taskid" if the owner of the task is the authenticated user. | required           |
| POST       | /        | Saves a task in the database.                                                                                   | required           |
| PUT        | /:taskid | Modifies the data stored for the task with "taskid" id if the owner of the task is the authenticated user.      | required           |
| DELETE     | /:taskid | Deletes the data stored for the task with "taskid" id if the owner of the task is the authenticated user.       | required           |

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
