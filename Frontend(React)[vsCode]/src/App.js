import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ServiceApp } from './components/service';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

let actionary = { ServiceApp };

let btn = document.getElementById("btn");
btn.addEventListener('click', () => {
  ServiceApp(): void
});


export default App;
