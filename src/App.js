
import './App.css';
import Header from './myComponents/Header';
import { Todos } from './myComponents/Todos';
import { Footer } from './myComponents/Footer';
import { AddTodo } from './myComponents/AddTodo';
import { About } from './myComponents/About';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  let initTodo;
  if (localStorage.getItem('todos') === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem('todos'));
  }


  const onDelete = (todo) => {
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  const addTodo = (title, desc) => {
    let sno = 0;
    if (todos.length === 0) {
      sno = 1;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

  }


  const [todos, setTodos] = useState(initTodo)
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <Router>
        <Header title="MyTodoList" searchBar={false} />
        <Routes>

          <Route path="/" element={[<AddTodo addTodo={addTodo} />, <Todos todos={todos} onDelete={onDelete} />]} />
          
          <Route path="/about" element={<About />} />
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
