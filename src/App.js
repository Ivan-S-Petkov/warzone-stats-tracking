import './App.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <div>Logo</div>
        <nav>
          <Link to="/stats">Stats</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/loadouts">Loadouts</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">
            <FontAwesomeIcon icon={solid('right-to-bracket')} /> Login
          </Link>
          <Link to="/register">
            <FontAwesomeIcon icon={solid('user-plus')} /> Sign Up
          </Link>
        </nav>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default App;
