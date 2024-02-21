import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function App() {
  return (
    <div className="App bg-blanc">
        <NavBar />   
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
    </div>
  );
}

export default App;
