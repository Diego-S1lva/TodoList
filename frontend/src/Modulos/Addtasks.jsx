import { useEffect, useRef, useState } from "react";
function Tasks(){
    const titleRef = useRef();
    const descriptionRef = useRef();
    const doneRef = useRef();
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);


  useEffect(() =>{
    async function fectchTasks() {
    const token = localStorage.getItem("token");
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
            const resposta = await response.json();
            if (response.ok) {
              alert("Tarefa adicionada")
              const newTask = { title, description, done, _id: resposta._id }; 
              setTasks((prevTasks) => [...prevTasks, newTask]);
            }else{
              alert("Erro:"+resposta.erro);
            }
        }catch(err){
          console.error("Erro ao enviar dados",err);
        }
      }  




    async function atualizarTasks() {
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const done = doneRef.current.value === "1";
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


 
    return (
        <div>
         <form onSubmit={addTask}>
          <input ref={titleRef} type="text" placeholder="Título"></input>
          <input ref={descriptionRef} type="text" placeholder="Descrição"></input>
          <select ref={doneRef}>
            <option value= "1">Concluída</option>
            <option value="0">A fazer</option>
          </select>
          <input type="submit"></input>
         </form>
          {taskToEdit && (
        <div>
          <h3>Editar Tarefa</h3>
          <input ref={titleRef} defaultValue={taskToEdit.title} />
          <input ref={descriptionRef} defaultValue={taskToEdit.description} />
          <select ref={doneRef} defaultValue={taskToEdit.done ? "1" : "0"}>
            <option value="1">Concluída</option>
            <option value="0">A fazer</option>
          </select>
          <button onClick={atualizarTasks}>Atualizar</button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
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