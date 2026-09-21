// App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './todo.css';

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let params;
    if (filter === 'active') params = { completed: false };
    if (filter === 'done') params = { completed: true };
    fetchTodos(params)
      .then(data => { setTodos(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [filter]);

  const handleAdd = async (title) => {
    const newTodo = await createTodo(title);
    setTodos(currentTodos => [newTodo, ...currentTodos]);
  };

  const handleToggle = async (id, done) => {
    const updated = await updateTodo(id, { done: !done });
    setTodos(currentTodos => currentTodos.map(t => t._id === id ? updated : t));
  };

  const handleRename = async (id, title) => {
    const updated = await updateTodo(id, { title });
    setTodos(currentTodos => currentTodos.map(t => t._id === id ? updated : t));
  };

  const handleRemove = async (id) => {
    await deleteTodo(id);
    setTodos(currentTodos => currentTodos.filter(t => t._id !== id));
  };

  return (
    <div className="receipt-page">
      <div className="filter-tabs">
        {['all', 'active', 'done'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`tab-btn ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="receipt">
        <header className="receipt-header">
          <span className="stamp">Tasks</span>
          <p className="receipt-date">{today}</p>
        </header>

        <TodoForm onAdd={handleAdd} />
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
