// my-app/src/components/TodoList.js
import React, {useState} from "react";
export default function TodoList(){
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const add = ()=> { if(task.trim()){ setTodos(t=>[...t, task]); setTask("") } }
  return (
    <div>
      <h2>Todo</h2>
      <input value={task} onChange={e=>setTask(e.target.value)} placeholder="task" />
      <button onClick={add} style={{marginLeft:8}}>Add</button>
      <ul>{todos.map((t,i)=>(<li key={i}>{t}</li>))}</ul>
    </div>
  );
}
