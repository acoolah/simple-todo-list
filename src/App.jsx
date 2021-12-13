import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

const LOCAL_STORAGE = "acoolah.SimpleToDoApp";

const App = () => {
  const [todo, setTodos] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE));

    if (storage) setTodos(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(todo));
  }, [todo]);

  const updateCardColor = (key, color) => {
    todo.forEach((item) => {
      if (item.id === key) {
        const updatedTodos = todo.map((item) => {
          if (item.id === key) {
            item.color = color;
          }
          return item;
        });

        setTodos([...updatedTodos]);
      }
    });
  };

  const deleteData = (id) => {
    const filtered = todo.filter((item) => {
      return item.id !== id;
    });
    setTodos(filtered);
  };

  const updateData = (data) => {
    setTodos([...todo, data]);
  };

  const clearData = (e) => {
    setTodos([]);
  };

  return (
    <main className="main">
      <div className="main__container content">
        <div className="content__todo">
          <TodoList
            list={todo}
            updateCallback={updateData}
            clearCallback={clearData}
            colorUpdateCallback={updateCardColor}
            deleteCallback={deleteData}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
