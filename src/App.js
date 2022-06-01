import './App.sass';
import './utils/firebase';
import Navigation from './components/main/Navigation';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import { Route, Routes, Switch, NavLink, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <div>Logo</div>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<></>} exact />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
