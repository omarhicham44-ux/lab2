// TodoItem.jsx
import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onRename, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = async () => {
    const title = newTitle.trim();
    if (!title) {
      setNewTitle(todo.title);
      setIsEditing(false);
      return;
    }

    await onRename(todo._id, title);
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo._id, todo.done)}
      />

      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') {
              setNewTitle(todo.title);
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <span className={`todo-title${todo.done ? ' done' : ''}`}>{todo.title}</span>
      )}

      <div className="todo-actions">
        <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Save' : 'Edit'}</button>
        <button className="remove-btn" onClick={() => onRemove(todo._id)}>Remove</button>
      </div>
    </li>
  );
}
