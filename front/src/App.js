import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let obj;
  fetch('localhost:3001') // Call the fetch function passing the url of the API as a parameter
  .then(function(returnA) {
      obj = returnA
  })
  console.log("obj = " + obj)
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
          {{obj}}
        </a>
      </header>
    </div>
  );
}

export default App;
