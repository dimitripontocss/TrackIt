import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";
import React from "react";

import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import MainPage from "./Components/MainPage";
import Today from "./Components/Today";
import History from "./Components/History"
import Footer from "./Components/Footer"

import TokenContext from "./Contexts/TokenContext";
import InfosContext from "./Contexts/InfosContext";
import PercentContext from "./Contexts/PercentContext";

export default function App(){

    const [token,setToken] = React.useState("")
    const [img,setImg] = React.useState("")
    const [percent,setPercent] = React.useState(0);

    return(
    <TokenContext.Provider value={{token,setToken}}>
        <InfosContext.Provider value={{img,setImg}}>
            <PercentContext.Provider value={{percent,setPercent}}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={ <Login /> } />
                        <Route path="/cadastro" element={ <Register /> } />
                        <Route path="/habitos" element={ <MainPage /> } />
                        <Route path="/hoje" element={ <Today /> } />
                        <Route path="/historico" element={ <History /> } />
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </PercentContext.Provider>
        </InfosContext.Provider>
    </TokenContext.Provider>
    )
}
