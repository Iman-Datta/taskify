import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CheckEmail from "./pages/CheckEmail";
import Task from "./pages/Task";

function App() {
  return (
    <div className="min-h-screen bg-white text-black pt-2">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkEmail" element={<CheckEmail />}/>
        <Route path = "/task" element = {<Task/>}/>
      </Routes>
    </div>
  );
}

export default App;
