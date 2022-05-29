import styled from "styled-components";
import TokenContext from "../Contexts/TokenContext";
import InfosContext from "../Contexts/InfosContext";
import { useContext } from "react";

export default function History(){

    const {setToken} = useContext(TokenContext)
    const {setImg} = useContext(InfosContext);

    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
        setToken(user.token)
        setImg(user.image)
    }
    return(
        <Container>
            <h2>Histórico</h2>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </Container>
    )
}

const Container = styled.div`
margin-top: 90px;

display: flex;
flex-direction: column;
align-items: flex-start;

padding: 15px;

h2{
    font-family: 'Lexend Deca',sans-serif;
    font-size: 23px;
    color: #126BA5;

    margin-bottom: 15px;
}
p{
    font-family: 'Lexend Deca',sans-serif;
    font-size: 18px;
    color: #666666;
}
`