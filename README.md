# ToDoList-api

A REST API for a todo list app.


## Features

- User, Task and Project models with CRUD operations.
- Separate route for each model.
- Authentication using JWT.


## Tech Stack

Node.js, Typescript, Javascript


## Documentation

Work in progress.


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

