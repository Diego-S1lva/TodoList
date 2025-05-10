import{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/styleLogin.css';

function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        const email = emailRef.current.value;
        const senha = passwordRef.current.value;
        try{
            const response = await fetch("http://localhost:3000/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                    
                },
                body: JSON.stringify({email, senha})
            });
            const resultado = await response.json();
            console.log(resultado);
             if (response.ok) {
                localStorage.setItem("token", resultado.token);
                console.log("Token armazenado:", resultado.token);
                navigate("/tarefas");
             }else{
                alert("Erro: "+ resultado.error);
             }
        }catch(err){
            console.error("Erro ao enviar dados: ", err);
        }
    }
    return(
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <header className='login'>
                        <h1>Login</h1>
                        <article>
                            <label className='email'>
                                Digite seu email <br/>
                            <input ref={emailRef} type='email' placeholder='Email'></input>
                            </label>
                            <label className='password'>
                                Digite sua senha <br/>
                            <input ref={passwordRef} type='password' placeholder='Senha'></input>
                            </label>
                            <input type='submit'></input>
                        </article>
                    </header>
                </form>
            </div>
    )
}

export default Login;