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
    setToken(user.token)
    setImg(user.image)

    const [create, setCreate] = useState(false)
    const [userHabits, setUserHabits] = useState([])
    const [newHabit,setNewHabit] = useState("")
    const [selectedD,setSelectedD] = useState([]);
    const [refresh,setRefresh] = useState(0)
    const [loading,setLoading] = useState(false)

    function deleteHabit(id){
        if(window.confirm("Você quer mesmo deletar?")){
            const deletePromise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        deletePromise.then(()=>{setToken(user.token); setRefresh(refresh +3)})
    }
    }

    function selectDay(index){
        if(selectedD.includes(index)){
            const newDays = selectedD.filter(function (f) { return f !== index })
            setSelectedD(newDays)
        }
        else{
            setSelectedD([...selectedD, index])
        }
    }

    function createNHabit(){
        setLoading(true);
        if(selectedD.length !==0){
        const promiseNewHabit = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
            name: newHabit,
            days: selectedD
        }
        ,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
        )
        promiseNewHabit.then(()=>{setCreate(false);setSelectedD([]);setNewHabit(""); setRefresh(refresh + 4);setLoading(false)})
        .catch(()=>{alert("Não foi possível salvar seu hábito, verifique suas respostas e tente novamente.");setLoading(false)})
        }else{
            alert("Selecione ao menos um dia!")
            setLoading(false)
        }
    }
    
    useEffect(() => {
            const promiseHabits = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            promiseHabits.then((response) => setUserHabits(response.data) );
        
    }, [refresh])

    return (
        <Container>
            <Topo>
                <Box>
                    <h2>Meus hábitos</h2>
                    <Add onClick={() => setCreate(true)}>+</Add>
                </Box>
                {!create ? <></> : <Create token={token} newHabit={newHabit} setNewHabit={setNewHabit}
                selectDay={selectDay} setCreate={setCreate} createNHabit={createNHabit} selectedD={selectedD} loading={loading} setLoading={setLoading}/>}
            </Topo>
            <Habits>
                {userHabits.length === 0 ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    : userHabits.map((value,index)=> <RenderHabit key={index} value={value}
                     deleteHabit={deleteHabit} /> )}
            </Habits>
        </Container>
    )
}

function RenderHabit({value,deleteHabit}){
    const arrDias = ["D","S","T","Q","Q","S","S"]
    const id = value.id;
    return(
        <Habit>
            <HAux>
                <p>{value.name}</p>
                <button onClick={() => deleteHabit(id)}><ion-icon name="trash-outline"></ion-icon></button>
            </HAux>
            <Dias>{arrDias.map((valor,index)=> <Days key={index} valor={valor} index={index} days={value.days} />)}
            </Dias>
        </Habit>
    )
}

function Create({token,newHabit,setNewHabit,selectDay,setCreate,createNHabit,selectedD,loading,setLoading}){
    const arrDias = ["D","S","T","Q","Q","S","S"]
    return(
        <>
        {
            loading 
            ? 
            <Loading>
                <LoadInfo>{newHabit}</LoadInfo>
                <Dias>
                    {arrDias.map((value,index) => <Dia key={index} value={value} index={index} selectDay={selectDay} selectedD={selectedD}/>)}
                </Dias>
                <Buttons>
                    <p>Cancelar</p>
                    <button>
                        <ThreeDots
                            height="20"
                            width="75"
                            color='white'
                            ariaLabel='loading'
                        />
                    </button>
                </Buttons>
            </Loading>
            : 
            <Creator>
                <input type="text" placeholder="nome do hábito" value={newHabit} 
                onChange={e => setNewHabit(e.target.value)}/>
                <Dias>
                    {arrDias.map((value,index) => <Dia key={index} value={value} index={index} selectDay={selectDay} selectedD={selectedD}/>)}
                </Dias>
                <Buttons>
                    <p onClick={()=>{setCreate(false)}}>Cancelar</p>
                    <button onClick={createNHabit}>Salvar</button>
                </Buttons>
            </Creator>
        }
        </>
        
    )
}

function Dia({value,index,selectDay,selectedD}){
    let selecionado = false;
    if(selectedD.length === 0){
        selecionado = false;
    }
    selecionado = selectedD.includes(index);
    return(
        <>
        {
            selecionado ? <SD onClick={()=>selectDay(index)}>{value}</SD> : 
            <D onClick={()=>selectDay(index)}>{value}</D>
        }
        </>
    )
}

function Days({days,index,valor}){
    let selecionado = false;
    selecionado = days.includes(index);
    return(
        <>
        {
            selecionado ? <SD>{valor}</SD> : <D>{valor}</D>
        }
        </>
    )
}

const Loading = styled.div`
margin-top: 20px;

padding: 10px;

width: 320px;
height: 150px;

border: 0.5px solid #52B6FF;
border-radius: 10px;

display: flex;
flex-direction: column;
align-items: flex-start;
`

const LoadInfo = styled.div`
height: 45px;
width: 270px;

overflow: hidden;

background: #F2F2F2;

border: 1px solid #D5D5D5;
border-radius: 5px;

margin-bottom: 8px;
padding: 10px;

font-family: 'Lexend Deca';
font-size: 20px;
color: #B3B3B3;
`

const Creator = styled.div`
margin-top: 20px;

padding: 10px;

width: 320px;
height: 150px;

border: 0.5px solid #52B6FF;
border-radius: 10px;

display: flex;
flex-direction: column;
align-items: flex-start;

input{
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    margin-bottom: 8px;
    padding: 10px;

    font-family: 'Lexend Deca';
    font-size: 20px;
    color: #666666;
 }

 input::placeholder{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: #DBDBDB;
 }
`
const Dias = styled.div`
display: flex;
`
const D = styled.div`
width: 30px;
height: 30px;

border: 1px solid #CFCFCF;
border-radius: 5px;

display: flex;
justify-content: center;
align-items: center;

margin-right: 5px;

font-family: 'Lexend Deca';
font-size: 19.976px;
color: #DBDBDB;
`
const SD = styled.div`
width: 30px;
height: 30px;

background-color: #CFCFCF;

border: 1px solid #D5D5D5;
border-radius: 5px;

display: flex;
justify-content: center;
align-items: center;

margin-right: 5px;

font-family: 'Lexend Deca';
font-size: 19.976px;
color: #FFFFFF;
`
const Buttons = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;

width: 100%;

margin-top: 20px;

p{
    font-family: 'Lexend Deca'; 
    font-size: 16px;
    color: #52b6ff;
}
button{
    background-color: #52b6ff;

    width: 65px;
    height: 25px;

    border: 0;
    border-radius: 5px;

    font-family: 'Lexend Deca'; 
    font-size: 16px;
    color: #ffffff;

    margin-left: 20px;
}
`

const Habit = styled.div`
width: 320px;
height: 90px;

padding: 10px;

display: flex;
flex-direction: column;

border: 0.5px solid #52B6FF;
border-radius: 10px;

margin-bottom: 20px;

p{
    margin-bottom: 15px;
}
button{
    width: 30px;
    font-size: 20px;
    background-color: #FFFFFF;
    border: 0;
}
`
const HAux =styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Container = styled.div`
margin-top: 80px;
`

const Box = styled.div`
display: flex;
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
flex-direction: column;
align-items: center;


h2{
    font-family: 'Lexend Deca';
    font-size: 23px;
    color: #126ba5;
}
`

const Habits = styled.div`
display: flex;
flex-direction: column;
align-items: center;

margin-bottom: 65px;

padding: 16px;
p{
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #666666;
}
`