import{useRef} from 'react'
function Cadastro(){
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    
    async function handleSubmit(event){
        event.preventDefault();

        const nome = nameRef.current.value;
        const email = emailRef.current.value;
        const senha = passwordRef.current.value;

        try{
            const responde = await fetch("http://localhost:3000/usuarios",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({nome, email, senha})
            });
            const resultado = await responde.json();
             if (responde.ok) {
                alert("Usuário cadastrado com sucesso!");
             }else{
                alert("Erro: "+ resultado.erro);
             }
        }catch(err){
            console.error("Erro ao enviar dados: ", err);
        }
    }
    return(
            <div>
                <form onSubmit={handleSubmit}>
                    <input ref={nameRef} type='text' placeholder='Nome'></input>
                    <input ref={passwordRef} type='password' placeholder='Senha'></input>
                    <input ref={emailRef} type='email' placeholder='Email'></input>
                    <input type='submit'></input>
                </form>
            </div>
    )
}

export default Cadastro;