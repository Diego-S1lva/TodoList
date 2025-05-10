import { useEffect, useRef, useState } from "react";
import '../styles/styleTasks.css';

function Tasks(){
    const titleRef = useRef();
    const descriptionRef = useRef();
    const doneRef = useRef();
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const editTitleRef = useRef();
    const editDescriptionRef = useRef();
    const editDoneRef = useRef();


  useEffect(() =>{
    async function fectchTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:3000/tarefas",{
      method: "GET",
        headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    setTasks (data.getasks || []);
      
    }
    fectchTasks();
  },[]);

   async function addTask(event){
      event.preventDefault();
      console.log("titleRef.current:", titleRef.current.value);
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const done = doneRef.current.value === "1";
      const token = localStorage.getItem("token");
        try{
            const response = await fetch("http://localhost:3000/tarefas",{
              
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
              },
              body: JSON.stringify({title, description,done})
            })
            if (response.ok) {
              const resposta = await response.json();
              alert("Tarefa adicionada")
              const newTask = { title, description, done, _id: resposta._id }; 
              setTasks((prevTasks) => [...prevTasks, newTask]);
            }else{
              alert("Erro:"+response.erro);
            }
        }catch(err){
          console.error("Erro ao enviar dados",err);
        }
      }  




    async function atualizarTasks() {
      const done = editDoneRef.current.value === "1";
      const title = editTitleRef.current.value;
      const description = editDescriptionRef.current.value;
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/tarefas/${taskToEdit._id}`, {
      method: "Put",
        headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
      },
      body: JSON.stringify({ title, description, done }),
    });
    if (response.ok) {
      alert("Tarefa atualizada");
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setTaskToEdit(null);
    }else{
      alert("Erro: "+ response.erro)
    }
      
  }
  ;

   async function deleteTask(taskId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/tarefas/${taskId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      alert("Tarefa deletada");
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } else {
      alert("Erro ao deletar tarefa");
    }
  }

  console.log(tasks)
 
    return (
        <div className='container1'>
         <form onSubmit={addTask}>
            <header className="addtask">
              <article>
                <label className="tittle">
                  <h1>Tarefas</h1>
                  <input ref={titleRef} type="text" placeholder="Título"></input>
                </label>
                <label className="description">
                  <input ref={descriptionRef} type="text" placeholder="Descrição"></input>
                </label>
              <label className="done">
                <select ref={doneRef}>
                <option value= "1">Concluída</option>
                <option value="0">A fazer</option>
              </select>
              </label>
              <input type="submit"></input>
              </article>
          </header>
         </form>
          {taskToEdit && (
        <div>
          <h3>Editar Tarefa</h3>
           <input ref={editTitleRef} defaultValue={taskToEdit.title}/>
    <input ref={editDescriptionRef} defaultValue={taskToEdit.description}/>
    <select ref={editDoneRef} defaultValue={taskToEdit.done ? "1" : "0"}>
            <option value="1">Concluída</option>
            <option value="0">A fazer</option>
          </select>
          <button onClick={atualizarTasks}>Atualizar</button>
        </div>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}
          className={task.done ? "concluida" : ""}
            >
            <strong>{task.title}</strong> - {task.description} -{" "}
            {task.done ? "Concluída" : "A fazer"}
            <button onClick={() => setTaskToEdit(task)}>Editar</button>
            <button onClick={() => deleteTask(task._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
      );
  }

export default Tasks;