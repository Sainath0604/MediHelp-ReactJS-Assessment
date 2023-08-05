import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./tailwind.css";

function App() {
  return (
    <div className="text-3xl text-red-500">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
