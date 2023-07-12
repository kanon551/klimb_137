import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './global/Layout';
import WrappedHome from './pages/Home';
import CharacterTree from './components/CharacterTree';
import CharTree from './components/CharTree';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><WrappedHome /></Layout>} />
          <Route path="/characterTree" element={<Layout><CharacterTree /></Layout>} />
          {/* <Route path="/characterTree" element={<Layout><CharTree /></Layout>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
