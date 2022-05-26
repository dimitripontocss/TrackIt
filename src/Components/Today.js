import TokenContext from "../Contexts/TokenContext";
import InfosContext from "../Contexts/InfosContext";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios";
import dayjs from "dayjs"
import PercentContext from "../Contexts/PercentContext";

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

function refreshCounter(data,setDone){
    let aux = 0;
    if(data.length === 0){
        setDone("vazio")
    }else{
    for(let i=0;i<data.length;i++){
        if(data[i].done === true){
            aux++;
        }
    } 
    setDone(aux);
}
}

export default function Today(){
    const { token, setToken } = useContext(TokenContext);
    const { setImg } = useContext(InfosContext);
    const { percent, setPercent } = useContext(PercentContext);

    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user.token);
    setImg(user.image);

    const [dailyTasks, setDailyTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [done,setDone] = useState(0);
    const [refresh,setRefresh] = useState(0);

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
            promiseHabits.then((response) => {setDailyTasks(response.data); setLoading(false); refreshCounter(response.data,setDone)} );
        
    }, [refresh])

    if(dailyTasks.length === 0){
        setPercent(0);
    }else{
        setPercent(done / dailyTasks.length)
    }

    return(
        <Container>
            <Topo>
                <Date>
                    <p>{diaDaSemana}, {day}/{month}</p> 
                </Date>
                <Progress>
                    {done === "vazio" ? <p>Nenhum hábito concluído ainda</p> : percent === 0 ? <p>Nenhum hábito concluído ainda</p> : <span>{percent*100}% dos hábitos concluídos</span> }
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
                                        dailyTasks.map((value,index)=> <Habit key={index} value={value} token={token} refresh={refresh} setRefresh={setRefresh}/>)
                                    }
                                </>
                }
            </DailyHabits>
        </Container>
    )
}


function check(id,token,refresh,setRefresh){
const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,null,
{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
promise.then(()=>setRefresh(refresh+1))
}

function unCheck(id,token,refresh,setRefresh){
const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,null,
{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
promise.then(()=>setRefresh(refresh+1))    
}

function Habit({value,token,refresh,setRefresh}){
    return(
        <Habito>
            <div>
                <h2>{value.name}</h2>
                <p>Sequência atual:{
                  value.done ?  <Done>{value.currentSequence} dia(s)</Done> : <Undone>{value.currentSequence} dia(s)</Undone>}</p>
                <p>Seu recorde: {
                value.highestSequence ===0 ? <Undone>{value.highestSequence} dia(s)</Undone> : value.highestSequence === value.currentSequence ? <Done>{value.highestSequence} dia(s)</Done> : <Undone>{value.highestSequence} dia(s)</Undone>
                }
                </p>
            </div>
            <div>
                { 
                    value.done ?  <Done onClick={()=>unCheck(value.id,token,refresh,setRefresh)}><ion-icon name="checkbox"></ion-icon></Done>
                    :
                    <Undone onClick={()=>check(value.id,token,refresh,setRefresh)}><ion-icon name="checkbox"></ion-icon></Undone>
                }
            </div>
        </Habito>
    )
}

const Done = styled.div`
color: #8FC549;
margin-left: 3px;
ion-icon{
    font-size: 70px;
}
`
const Undone = styled.div`
color: #666666;
margin-left: 3px;
ion-icon{
    font-size: 70px;
    color: #EBEBEB;
}
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
    display: flex;
}
`

const Container = styled.div`
margin-top: 95px;
`
const Topo = styled.div`
margin-left: 20px;
display: flex;
flex-direction: column;
align-items: flex-start;

`
const Progress = styled.div`
p{
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #BABABA;
}
span{
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #8FC549;
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
margin-bottom: 85px;
`
const Load = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`