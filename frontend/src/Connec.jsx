import { useEffect, useState } from "react";
function Component(){
const [dados, setDados] = useState([]);
}
async function Connec(){
    let response = await fetch('http://localhost:3000/usuarios');


if(response.ok){
    let json = await response.json();
}else{
    alert("HTTP-Error: "+response.status);
}

useEffect(() => {
    Connec();
},[]);
}

export default Component;