import TokenContext from "../Contexts/TokenContext";
import InfosContext from "../Contexts/InfosContext";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios";

export default function MainPage() {

    const { token, setToken } = useContext(TokenContext)
    const { setImg } = useContext(InfosContext);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
        setToken(user.token)
        setImg(user.image)
    }

    function deleteHabit(id){
        console.log(id)
        if(window.confirm("Você quer mesmo deletar?")){
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    }

    const [create, setCreate] = useState(false)
    const [userHabits, setUserHabits] = useState([])

    
    useEffect(() => {
        if (token.length !== 0) {
            const promiseHabits = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            promiseHabits.then((response) => { setUserHabits(response.data); console.log("deu") })
        }
    }, [])

    console.log(userHabits)
    return (
        <Container>
            <Topo>
                <h2>Meus hábitos</h2>
                <Add onClick={() => setCreate(true)}>+</Add>
                {create ? <></> : <Create></Create>}
            </Topo>
            <Habits>
                {userHabits.length === 0 ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    : userHabits.map((value,index)=> <RenderHabit key={index} value={value} deleteHabit={deleteHabit} /> )}
            </Habits>
        </Container>
    )
}

function Days({days}){
    
}

function RenderHabit({value,deleteHabit}){
    console.log(value)
    const id = value.id;
    return(
        <Habit>
            <p>{value.name}</p>
            <button onClick={() => deleteHabit(id)}><ion-icon name="trash-outline"></ion-icon></button>
            <Days days={value.days} />
        </Habit>
    )
}

const Habit = styled.div`
width: 90%;
height: 90px;
display: flex;
flex-direction: column;

position: relative;

button{
    position: absolute;
    top: 10px;
    right: 15px;
    width: 30px;
    font-size: 20px;
    background-color: #FFFFFF;
    border: 0;
}
`

const Container = styled.div`
margin-top: 80px;
`

const Add = styled.button`
width: 40px;
height: 35px;

margin-left: 140px;

border: 0;

background: #52B6FF;
border-radius: 5px;

font-size: 27px;
color: #FFFFFF;
`

const Topo = styled.div`
padding: 16px;

display: flex;
align-items: center;
justify-content: space-between;

h2{
    font-family: 'Lexend Deca';
    font-size: 23px;
    color: #126ba5;
}
`

const Create = styled.div`
`

const Habits = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

padding: 16px;
p{
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #666666;
}
`