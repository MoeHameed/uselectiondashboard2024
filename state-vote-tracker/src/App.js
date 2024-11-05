import './App.css';

import StateVoteTracker from './components/StateVoteTracker';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <link href="./output.css" rel="stylesheet"></link>
      <main>
        <StateVoteTracker />
      </main>
    </div>
  );
}

export default App;
