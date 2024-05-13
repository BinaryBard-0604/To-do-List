import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, addTitle, deleteTodo, editTodo } from "./actions";
import "./App.css";

function App() {
  const todos = useSelector((state) => state.todos);
  const titles = useSelector((state) => state.titles);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (title.trim() !== "") {
      if (editIndex !== null) {
        dispatch(editTodo(editIndex, text));
        setEditIndex(null);
      } else {
        dispatch(addTodo(text));
        dispatch(addTitle(title));
      }
      setText("");
      setTitle("");
      console.log(todos);
    }
  };

  const handleEditTodo = (index, todo) => {
    setText(todo);
    setEditIndex(index);
  };

  return (
    <div className="app-container">
      <h1>Todo App using Redux</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new title..."
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button className="add-button" onClick={handleAddTodo}>
          {editIndex !== null ? "Edit" : "Add"}
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="title">{titles[index].title}</span>

            {editIndex === index ? (
              <input
                type="text"
                value={text} // Set the value to the current todo text
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <span className="todo-text">{todo.todo}</span>
            )}
            <div className="button-container">
              {editIndex === index ? (
                <>
                  <button
                    className="save-button"
                    onClick={() => {
                      dispatch(editTodo(index, text));
                      setEditIndex(null);
                      setText("");
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setEditIndex(null);
                      setText("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-button"
                    onClick={() => handleEditTodo(index, todo.todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => dispatch(deleteTodo(index))}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
