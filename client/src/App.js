import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectCreate from "./components/Project/Create";
import UserProject from "./components/Project/UserProject";

function App() {
  return (
    <div className="App bg-slate-950 h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/create" element={<ProjectCreate />} />
        <Route path="/myprojects" element={<UserProject />} />
      </Routes>
    </div>
  );
}

export default App;
