
import { useState, useEffect } from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Cadastro from './Modulos/cadastro.jsx';
import Tasks from './Modulos/tasks.jsx';
import Login from './Modulos/login.jsx';
function App(props) {
  const [mensagem, setMensagem] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setMensagem(data))
      .catch((err) => console.error("Erro ao buscar API", err));
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path="/tarefas" element={<Tasks/>}/>
      <Route path="/" element={<Navigate to={'/cadastro'}/>}/>
      <Route path="/cadastro" element={<Cadastro />}></Route>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
