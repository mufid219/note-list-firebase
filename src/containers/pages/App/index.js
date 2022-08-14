import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home </Link>
        <Link to="/login">Login </Link>
        <Link to="/register">register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
