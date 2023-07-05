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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><WrappedHome /></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
