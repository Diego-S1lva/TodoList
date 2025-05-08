import { useState } from "react";
function Taks(){
    const [lista, setLista] = useState([]);
    const [entrada, setEntrada] = useState("");


    function addTask(){
        if(entrada.trim() === "") return;
        setLista([...lista, entrada]);
        setEntrada("");
    }
    return (
        <div>
          <input
            type="text"
            placeholder="Digite a tarefa"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
          />
          <button onClick={addTask}>Enviar</button>
    
          <ul>
            {lista.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
}

export default Taks;