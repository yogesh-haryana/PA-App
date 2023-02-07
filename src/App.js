import "./App.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import LoginForm from "./components/LoginForm";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { fullName, role } = user;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path={`/dashboard/${role}/${fullName}`}
            element={(
              <ProSidebarProvider>
                <Dashboard />
              </ProSidebarProvider>
            )}
          />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
