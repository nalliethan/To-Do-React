import React from 'react'
import { FaRegCircle,FaCheckCircle  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoList = ({text,id,isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex justify-between border-b-[#ecdcbf] border-b-2'>
      <li className="flex items-center h-12 cursor-pointer w-full"
          onClick={() => toggle(id)}>

        {isComplete? <FaCheckCircle className="mr-3 w-[40px] h-12 p-2 text-[#759cf7]"/>:<FaRegCircle className="mr-3 w-[40px] h-12 p-2 text-[#759cf7]"/>}
        
        <p className={`${isComplete? "line-through": ""} ${isComplete? "text-gray-400": ""}`}>{text}</p> 
      
      </li>

      <MdDelete className="w-[40px] h-12 p-2 ml-3 text-gray-400 cursor-pointer" onClick={() => deleteTodo(id)}/>
    </div>
  )
}

export default TodoList
