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


//Adiconar uma nova tarefa
  const addTodo = (text, category) => { //Cria uma funcao,e a decalra com dois parametros que serao passados, text e category
    const newTodos = [ //Cria um novo array de tarefas
      ...todos, //Utilizando o spread, ele copia todos os elementos do array todos para o novo array newTodos.
      {
        id: Math.floor(Math.random() * 1000),  //Gera automaticamente um id aleatorio para cada tarefa
        text,  //Cria um texto
        category, //Cria uma categoria 
        isCompleted: false, //Define o estado inicial da nova tarefa como false, ou seja, incompleta
      },
    ];
    setTodos(newTodos); //Atualiza o valor da constante, passando um novo array criado
  };

  const removeTodo = (id) => { //Funcao passada como parametro um identifcador que sera removido.
    const newTodos = todos.filter((todo) => todo.id !== id); //Cria um novo array usando o metodo filtrar e exclui a tarefa cujo 'id' corresponde ao id fornecido
    setTodos(newTodos); //Atualiza o estado da variavel
  };

  const completeTodo = (id) => {  //Funcao passada como parametro um identifcador unico
    const newTodos = todos.map((todo) => //Usa o map para criar um novo array de tarefa
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo //Para cada tarefa com o id correspondente, cria um novo objeto de tarefa com o campo isCompleted, alternado.Para as outras tarefas, mantem inalteradas.
    );
    setTodos(newTodos); //Atualiza o valor da constante.
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
