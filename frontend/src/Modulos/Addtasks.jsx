import { useRef, useState } from "react";
function Tasks(){
    const titleRef = useRef();
    const descriptionRef = useRef();
    const doneRef = useRef();



    async function addTask(event){
      event.preventDefault();
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const done = doneRef.current.value === "1";

        try{
            const response = await fetch("http://localhost:3000/tarefas",{
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({title, description,done})
            })
            const resposta = await response.json();
            if (response.ok) {
              alert("Tarefa adicionada")
            }else{
              alert("Erro:"+resposta.erro);
            }
        }catch(err){
          console.error("Erro ao enviar dados",err);
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
        </div>
      );
  }

export default Tasks;