import React from 'react';
import BoatList from './components/BoatList';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload. env:{' '}
          {process.env.NODE_ENV}
        </p>
        <BoatList />
      </header>
    </div>
  );
}

export default App;
