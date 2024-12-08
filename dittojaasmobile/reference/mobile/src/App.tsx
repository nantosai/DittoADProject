/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default <App><*/


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Importing route components
import Dashboard from './routes/dashboard';
import Contact from './routes/contact';
import SignIn from './routes/sign-in';
import SignUp from './routes/sign-up';
import DashboardInvoices from './routes/dashboard.invoices';
import DashboardSUV from './routes/dashboard-SUV';
import DashboardSEDAN from './routes/dashboard-SEDAN';
import DashboardMPV from './routes/dashboard-MPV';
import DashboardMINI from './routes/dashboard-MINI';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        {/* Header with Vite and React logos */}
        <header>
          <div>
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
        </header>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/dashboard/invoices">Invoices</Link></li>
          </ul>
        </nav>

        {/* Count Button */}
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        {/* Routes Configuration */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard/invoices" element={<DashboardInvoices />} />
          <Route path="/dashboard-SUV" element={<DashboardSUV />} />
          <Route path="/dashboard-SEDAN" element={<DashboardSEDAN />} />
          <Route path="/dashboard-MPV" element={<DashboardMPV />} />
          <Route path="/dashboard-MINI" element={<DashboardMINI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








