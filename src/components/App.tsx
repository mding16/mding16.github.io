import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
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
