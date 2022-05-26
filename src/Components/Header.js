import styled from "styled-components";
import { useContext } from "react";
import InfosContext from "../Contexts/InfosContext";
import { useNavigate } from "react-router-dom";

export default function Header(){

    const {img} = useContext(InfosContext)
    const navigate = useNavigate();
    function logOff(){
        if(window.confirm("Voce quer mesmo sair?")){
            localStorage.clear(); 
            navigate("/");
        }
    }
    return(
        <>
        {img === "" ? <></> :
        <Container>
            <h1>TrackIt</h1>
            <div><img src={img} alt="Foto de perfil do usuário" /> <div onClick={logOff}><ion-icon name="exit-outline"></ion-icon></div> </div>
        </Container>}
    </>
    )
}

const Container = styled.div`
position: fixed;
top: 0;
left: 0;

width: 100%;
height: 70px;

background-color: #126BA5;

display: flex;
align-items: center;
justify-content: space-between;

padding: 20px;

box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);

    >div{
        display: flex;
        align-items: center;
    }
    h1{
        font-family: 'Playball';
        font-size: 39px;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin-right: 10px;
    }
    ion-icon{
        font-size: 40px;
        color: #FFFFFF;
    }
`