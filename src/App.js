import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// eslint-disable-next-line import/no-named-default
import { default as ReduxThunk } from "redux-thunk";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import rootReducers from "./Redux/rootReducer";
import Registration from "./components/Registration";
import LoginForm from "./components/LoginForm";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";

function App() {
  const store = createStore(rootReducers, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
          </Routes>
        </Router>
      </div>
    </Provider>

  );
}

export default App;
