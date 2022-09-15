import './App.css';
import {useEffect, useRef, useState} from 'react';

function App() {

  const getlocaItems = () => {
    let list = localStorage.getItem('lists');

    if(list){
    return JSON.parse(localStorage.getItem('lists'));
  } else{
    return [];
  }
}

  const[todoList, setTodoList] = useState(getlocaItems());
  const[currentTask, setCurrentTask] = useState("");

  const inputTask = useRef(null);

  const addTodo = () => {
    setTodoList([...todoList, {todo:currentTask, completed: false}]);
    inputTask.current.value = "";
    setCurrentTask("");
  };

  const deleteTodo = (todoToDelete) => {
    setTodoList(todoList.filter((todo) => {
      return todo.todo !== todoToDelete;
    })
    )
  }

  const completeTodo = (todoToComplete) => {
    setTodoList(todoList.map((todo) => {
      return todo.todo === todoToComplete
      ? {todo: todoToComplete, completed: true}
      : {todo: todo.todo, completed: todo.completed ? true : false}
    })
    )
  }

  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(todoList))
  },[todoList])

  return (
    <div className="App">
      <div>
      <h1>Todo List</h1>
      <input onKeyDown={(event) => {
        if(event.keyCode === 13) {
          addTodo();
        }
      }} ref={inputTask} type="text" placeholder="Add Todo" onChange={(event)=>{setCurrentTask(event.target.value)}}/>
      <button onClick={addTodo} >Add Todo</button>
      </div>
      <hr/>
      <ul>
        {todoList.map((val, key) =>{
          return(
            <div id='todo'>
          <li key={key}>{val.todo}</li>
          <button onClick={() => completeTodo(val.todo)}>Completed</button>
          <button onClick={() => deleteTodo(val.todo)}>Delete</button>
          {val.completed ? (
            <h1>Task Completed</h1>) :
             (<h1>Task Not Completed</h1>)}</div>
          
          
          ) 
        })}
      </ul>
      </div>
    
  );
}

export default App;
