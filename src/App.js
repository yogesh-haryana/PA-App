import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import rootReducers from "./Redux/rootReducer";
import Registration from "./components/Registration";
import LoginForm from "./components/LoginForm";

function App() {
  const store = createStore(rootReducers);
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Router>
      </div>
    </Provider>

  );
}

export default App;
