import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App bg-slate-950 h-screen">
        <NavBar />   
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
    </div>
  );
}

export default App;
