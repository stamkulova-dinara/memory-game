import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Game } from '../Game';
import { Home } from '../Home/home';
import Leaderboard from '../Leaderboard/leaderboard';

export const GameRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/game' element={<Game/>}/>
            <Route path='/leaderboard' element={<Leaderboard/>}/>
        </Routes>
    </Router>
  )
}