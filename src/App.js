import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
