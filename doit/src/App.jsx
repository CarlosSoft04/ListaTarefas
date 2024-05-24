import "./App.css";
import React, { useState, useEffect } from 'react';

import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"
import Search from "./components/Search";
import Filter from "./components/Filter";




function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Tentar carregar os dados do localStorage ao montar o componente
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do localStorage:', error);
    }
  }, []);

  useEffect(() => {
    // Tentar salvar os dados no localStorage sempre que os todos mudarem
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Erro ao salvar os dados no localStorage:', error);
    }
  }, [todos]);

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 1000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <h1>Lista de tarefas:</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className='todo-list'>
        {todos
          .filter((todo) =>
            filter === 'All'
              ? true
              : filter === 'Completed'
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === 'Asc'
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <div>
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
