import styled from "styled-components";
import { useContext } from "react";
import InfosContext from "../Contexts/InfosContext";

export default function Header(){

    const {img} = useContext(InfosContext)

    return(
        <>
        {img === "" ? <></> :
        <Container>
            <h1>TrackIt</h1>
            <img src={img} alt="Foto de perfil do usuário" />
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

    h1{
        font-family: 'Playball';
        font-size: 39px;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
`