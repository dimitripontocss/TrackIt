import styled from "styled-components";
import { useContext,useState } from "react";
import InfosContext from "../Contexts/InfosContext";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function Footer(){
    const {img} = useContext(InfosContext)
    const [percentage,setPercentage] = useState(0)

    return(
        <>
        {img === "" ? <></> :
        <Container>
            <Link to="/habitos" style={{ textDecoration: 'none', color: "#52B6FF" }} ><h3>Hábitos</h3></Link>
            <Progresso><CircularProgressbar value={percentage} text="Hoje" 
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent",
                    textFont: 'Lexend Deca'
                })}/>
        </Progresso>
            <Link to="/historico" style={{ textDecoration: 'none', color: "#52B6FF"}} ><h3>Histórico</h3></Link>
        </Container>}
    </>
    )
}

const Container = styled.div`
position: fixed;
bottom: 0;
left: 0;

display: flex;
justify-content: space-around;
align-items: center;

width: 100%;
height: 70px;

background-color: #FFFFFF;

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 18px;

box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, 0.2);

`
const Progresso = styled.div`
width: 90px;
margin-bottom: 40px;
`