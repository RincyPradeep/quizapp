import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/includes/Header/Header";
import Game from "./components/screens/Game/Game";
import Home from "./components/screens/Home/Home";
import Category from "./components/screens/Category/Category";
import Login from "./components/screens/Login/Login";
import Signup from "./components/screens/Signup/Signup";
import Statistics from "./components/screens/Statistics/Statistics";

import { AuthProvider } from './context/AuthContext';
import { StatisticsProvider } from './context/StatisticsContext';
import { GameProvider } from "./context/GameContext";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <StatisticsProvider>
            <GameProvider>
              <Header />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />           
                <Route path="/game/category/:id" element={<Game />} /> 
                <Route path="/category" element={<Category />} />           
                <Route path="/statistics/:id" element={<Statistics />} />
              </Routes>
            </GameProvider>
          </StatisticsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
