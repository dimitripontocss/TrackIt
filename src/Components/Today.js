import TokenContext from "../Contexts/TokenContext";
import InfosContext from "../Contexts/InfosContext";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios";
import dayjs from "dayjs"

function translate(weekDay){
    if(weekDay === "Sunday"){
        return "Domingo"
    }
    if(weekDay === "Monday"){
        return "Segunda"
    }
    if(weekDay === "Tuesday"){
        return "Terça"
    }
    if(weekDay === "Wednesday"){
        return "Quarta"
    }
    if(weekDay === "Thursday"){
        return "Quinta"
    }
    if(weekDay === "Friday"){
        return "Sexta"
    }
    if(weekDay === "Saturday"){
        return "Sabádo"
    }
}

export default function Today(){
    const { token, setToken } = useContext(TokenContext);
    const { setImg } = useContext(InfosContext);

    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user.token);
    setImg(user.image);

    const [dailyTasks, setDailyTasks] = useState([])
    const [loading, setLoading] = useState(true)

    const weekDay = dayjs().format("dddd");
    const diaDaSemana = translate(weekDay);
    const day = dayjs().format("DD");
    const month = dayjs().format("MM");

    useEffect(() => {
            const promiseHabits = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            promiseHabits.then((response) => {setDailyTasks(response.data); setLoading(false)} );
        
    }, [])

    console.log(dailyTasks)
    return(
        <Container>
            <Topo>
                <Date>
                    <p>{diaDaSemana}, {day}/{month}</p> 
                </Date>
                <Progress>
                    <p>Nenhum hábito concluído ainda</p>
                </Progress>
            </Topo>
            <DailyHabits>
                {
                    loading ? <Load>
                                <ThreeDots
                                    height="500"
                                    width="100"
                                    color='#126BA5'
                                    ariaLabel='loading'
                                />
                                </Load> 
                                : 
                                <>
                                    {
                                        dailyTasks.map((value,index)=> <Habit key={index} value={value}/>)
                                    }
                                </>
                }
            </DailyHabits>
        </Container>
    )
}

function Habit({value}){
    console.log(value)
    return(
        <Habito>
            <div>
                <h2>{value.name}</h2>
                <p>Sequência atual: {value.currentSequence}</p>
                <p>Seu recorde: {value.highestSequence}</p>
            </div>
            <div>
                { 
                    value.done ?  <Done><ion-icon name="checkbox"></ion-icon></Done>
                    :
                    <Undone><ion-icon name="checkbox"></ion-icon></Undone>
                }
            </div>
        </Habito>
    )
}

const Done = styled.div`
font-size: 70px;
color: #8FC549;
`
const Undone = styled.div`
font-size: 70px;
color: #EBEBEB;
`

const Habito = styled.div`
width: 320px;
height: 90px;

display: flex;
align-items: center;
justify-content: space-between;

border: 0.5px solid #52B6FF;
border-radius: 10px;

padding: 10px;

margin-bottom: 15px;

h2{
    font-family: 'Lexend Deca';
    font-size: 20px;
    color: #666666;

    margin-bottom: 7px;

}
p{
    font-family: 'Lexend Deca';
    font-size: 13px;
    color: #666666;

    margin-bottom: 4px;
}
`

const Container = styled.div`
margin-top: 95px;
`
const Topo = styled.div`
margin-left: 20px;
`
const Progress = styled.div`
p{
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #BABABA;
}
`
const Date = styled.div`
p{
    font-family: 'Lexend Deca';
    font-size: 23px;
    color: #126BA5;

    margin-bottom: 5px;
}
`
const DailyHabits = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

margin-top: 20px;
`
const Load = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`