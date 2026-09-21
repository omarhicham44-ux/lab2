// TodoForm.jsx
import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onAdd(text.trim());
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task..." />
      <button type="submit">Add</button>
    </form>
  );
}
