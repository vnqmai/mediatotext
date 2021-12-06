import logo from './logo.svg';
import './App.css';
import './style/style.css';
import RecognizePage from './component/RecognizePage/RecognizePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Layout/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <RecognizePage/>
    </div>
  );
}

export default App;
