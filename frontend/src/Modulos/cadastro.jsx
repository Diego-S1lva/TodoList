import{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import  '../styles/styleCadastro.css';
function Cadastro(){
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate();

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
                navigate("/login");
             }else{
                alert("Erro: "+ resultado.erro);
             }
        }catch(err){
            console.error("Erro ao enviar dados: ", err);
        }
    }
    return(
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <header className='header'>
                        <h1>Cadastro</h1>
                        <article>
                            <label className='nome'>
                                Digite seu nome: <br/>
                                <input ref={nameRef}  type='text' placeholder='Nome'/>
                            </label>
                            <label className='email'>
                                Digite seu email: <br/>
                                <input ref={emailRef} type='email' placeholder='Email'/> 
                            </label>
                            <label className= 'password'>
                                Digite sua senha: <br/>
                                <input ref={passwordRef} type='password' placeholder='Senha'/><br/>
                                <input className='Enviar'type='submit'></input>
                            </label>
                        </article>
                    </header>
                </form>
                <p className='forlogin'>Já tem conta?
                    <a href='/login'>Clique aqui</a>
                </p>
            </div>
    )
}

export default Cadastro;