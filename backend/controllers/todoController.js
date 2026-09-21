const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = {};

    if (completed !== undefined) {
      if (completed !== 'true' && completed !== 'false') {
        return res.status(400).json({ error: 'Completed must be true or false' });
      }
      filter.done = completed === 'true';
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createTodo = async (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  if (!title) return res.status(400).json({ error: 'Title is required' });
  
  try {
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateTodo = async (req, res) => {
  const updates = {};

  if ('title' in req.body) {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) return res.status(400).json({ error: 'Title is required' });
    updates.title = title;
  }

  if ('done' in req.body) {
    if (typeof req.body.done !== 'boolean') {
      return res.status(400).json({ error: 'Done must be a boolean' });
    }
    updates.done = req.body.done;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid updates provided' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
