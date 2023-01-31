import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import SignUpForm from "./components/SignUpForm";
import rootReducers from "./Redux/rootReducer";

function App() {
  const store = createStore(rootReducers);
  return (
    <div className="App">
      <Provider store={store}>
        <SignUpForm />
      </Provider>

    </div>
  );
}

export default App;
