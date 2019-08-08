const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  /* GET */

  // todos - Get all todos
  app.get('/api/todos', todosController.list);

  // todos - get one todo
  app.get('/api/todos/:todoId', todosController.retrieve);


  /* POST */

  // todos - create a todo
  app.post('/api/todos', todosController.create);

  // todoItems - create a todo item under a todo
  app.post('/api/todos/:todoId/items', todoItemsController.create);


  /* PUT */

  // todos - update a todo
  app.put('/api/todos/:todoId', todosController.update);

  // todoItems - update a todo item
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);


  /* DELETE */

  // todos - delete a todo
  app.delete('/api/todos/:todoId', todosController.destroy);

  // todoItems - delete a todo item
  app.delete('/api/todos/:todoId/items/todoItemId', todoItemsController.destroy);


  // For any other request method on todo items, we're going to return "Method not allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method not allowed',
    })
  );
};