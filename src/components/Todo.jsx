import React, { useRef, useState, useEffect } from 'react'
import TodoList from './TodoList'

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")): []);

  const inputRef = useRef(); 

  {/*------------------ Add Todo ----------------------- */}
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === ""){
       return null;
    }
    
    {/* 1. create new task */}
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }

    {/* 2. Store the object into the master todolist array */}
    setTodoList((prev) => [...prev, newTodo]);

    {/* 3. Clear the user input box */}
    inputRef.current.value = "";
  }


  {/*------------------ Delete Todo ----------------------- */}
  const deleteTodo = (id) => {
    setTodoList((prev) => {
      return prev.filter((todo) => todo.id != id)
    })
  }

  {/*------------------ Toggle Todo ----------------------- */}
  const toggle = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if(todo.id === id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;
      })
    })
  }


  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todoList))
  },[todoList])

  return (
    <div className="bg-white w-[90%] max-w-[400px] mx-auto my-20 h-[450px] overflow-hidden shadow-md p-6">
      <h1 className="text-3xl font-poppins font-semibold text-[#759cf7]">
        TO-DO LIST
      </h1>

      <div className="bg-gray-100 rounded-lg flex mt-4">
        <input ref={inputRef} type="text" 
        placeholder="Enter new task" 
        className="p-4 flex-1 border-none outline-none"
        onKeyDown={(e) => { if(e.key === "Enter") add();}}/>

        <button className="bg-[#f296b8] text-white p-3 w-[60px] font-bold text-2xl rounded-lg cursor-pointer" onClick={add}>
          +
        </button>
      </div>

      <ul className="my-5 max-h-[280px] overflow-auto">
        {todoList.map((item, idx) => {
          return <TodoList key={idx} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
        })}
      </ul>
    </div>
  )
}

export default Todo
