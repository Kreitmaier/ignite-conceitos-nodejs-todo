const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if(!user){
    return response.status(404).json({error: "User not found!"});
  }

  request.user = user;

  return next();

}

// create a user
app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlredyExists = users.some((user) => user.username === username);

  if(userAlredyExists){
    return response.status(400).json({error: "User alredy exists!"});
  }

  users.push({
    id: uuidv4(),
    name: name,
    username: username,
    todos: []
  });

  return response.status(201).json(users[users.length -1]);

});

//list all users
app.get('/users', (request, response) => {
return response.status(201).json(users);
});

//list todos of user
app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

//create a todo to user
app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const todoCreate = {
    id: uuidv4(),
    title: title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }; 

  user.todos.push(todoCreate);

  return response.status(201).json(todoCreate);  

});

//change todo of user by id
app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline} = request.body;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if(todoIndex === -1 ){
    return response.status(404).json({error: "Todo not found!"});
  }

  const todoUpdated = { ...user.todos[todoIndex], 
    title: title,
    deadline: new Date(deadline)
  }

  user.todos = [
    ...user.todos.slice(0, todoIndex),
    todoUpdated,
    ...user.todos.slice(todoIndex + 1),
  ];

  return response.json(todoUpdated);
});

//change todo to done
app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);
  
  if(todoIndex === -1 ){
    return response.status(404).json({error: "Todo not found!"});
  }

  const todoUpdated = { ...user.todos[todoIndex], 
    done: true
  }

  user.todos = [
    ...user.todos.slice(0, todoIndex),
    todoUpdated,
    ...user.todos.slice(todoIndex + 1),
  ];

  return response.json(todoUpdated);
});

//delete a todo
app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if(todoIndex === -1){
    return response.status(404).json({error: "Todo not found!"});
  }

  user.todos = [...user.todos.slice(0, todoIndex), ...user.todos.slice(todoIndex + 1)];

  return response.status(204).send();

});

module.exports = app;