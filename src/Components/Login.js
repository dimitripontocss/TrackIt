import { useContext,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext";
import InfosContext from "../Contexts/InfosContext";
import styled from "styled-components";
import logo from "../assets/Group 8.jpg"
import { ThreeDots } from  'react-loader-spinner'
import axios from "axios";

export default function Login(){

    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

    const {setToken} = useContext(TokenContext);
    const {setImg} = useContext(InfosContext);
    setImg("")

    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
        setToken(user.token)
        setImg(user.image)
        navigate("/habitos")
    }


    function logar(event){
        setLoading(true)
        event.preventDefault();
        const body = {
            email: email,
            password: senha
        }
        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            body
          );
          promise.then((res) => {
            console.log(res.data);
            setToken(res.data.token);
            setImg(res.data.image);
            const user = JSON.stringify(res.data);
            console.log(user)
            localStorage.setItem("user", user);
            navigate("/habitos");
          }).catch(()=>{alert("Não foi possível logar na sua conta, verifique seu dados e tente novamente!"); setLoading(false)});
    }


    return(
        <Container>
            <img src={logo} alt="Logomarca"/>
            {loading ? 
                <>
                    <Loads>{email}</Loads>
                    <Loads>Segredo ;)</Loads> 
                    <Loading>
                    <ThreeDots
                        height="50"
                        width="75"
                        color='white'
                        ariaLabel='loading'
                    />
                    </Loading>
                </>
                : 
                <form onSubmit={logar}>
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)}/>
                    <button type="submit">Entrar</button>
                </form>
            }
            <Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link>
            <Infos>Site criado por Dimitri Daher Assis - Maio 2022</Infos>
        </Container>
    )
}

const Infos = styled.div`
margin-top: 80px;

font-family: 'Lexend Deca',sans-serif;
font-style: normal;
font-weight: 400;
font-size: 12px;
color: lightgray;
`

const Loads = styled.div`
height: 45px;
width: 80%;

overflow: hidden;

background: #F2F2F2;

border: 1px solid #D5D5D5;
border-radius: 5px;

margin-bottom: 8px;
padding: 10px;

display: flex;
align-items: center;

font-family: 'Lexend Deca',sans-serif;
font-style: normal;
font-weight: 400;
font-size: 19.976px;
color: lightgray;
`
const Loading = styled.div`
height: 45px;
width: 80%;

overflow: hidden;

background-color: #52b6ff;

border: 1px solid #D5D5D5;
border-radius: 5px;

margin-bottom: 8px;
padding: 10px;

display: flex;
align-items: center;
justify-content: center;
`

const Container = styled.div`
margin-top: 75px;
display: flex;
flex-direction: column;
align-items: center;

 form{
     display: flex;
     flex-direction: column;

     margin-top: 25px;

     width: 80%;
 }
 input{
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    margin-bottom: 8px;
    padding: 10px;

    font-family: 'Lexend Deca',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: black;
 }

 input::placeholder{
    font-family: 'Lexend Deca',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: #DBDBDB;
 }
 button{
     height: 45px;
     background-color: #52b6ff;
     border: 0;
     border-radius: 5px;

    font-family: 'Lexend Deca',sans-serif;
    font-size: 20px;
    color: #FFFFFF;
 }
 p{
    margin-top: 25px;
    font-family: 'Lexend Deca',sans-serif; 
    font-size: 13.976px;
    color: #52B6FF;
    text-decoration-line: underline;
 }
`