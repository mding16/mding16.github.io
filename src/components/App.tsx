import '../styles/App.css';
import REPL from "./REPL";

/**
 * App function that runs MOCK
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Welcome to Mock!</h1>
      </p>
      <REPL />
    </div>
  );
}

export default App;
