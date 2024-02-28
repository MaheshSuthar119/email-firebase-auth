import React from 'react';
import { Route , Routes} from 'react-router-dom';
import './App.css';
import App1 from './components/App1';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
       <Routes> 
          <Route exact path="/" element={<App1/>} /> 
          <Route path="/home" element={<Home />} />  
      </Routes> 
    </div>
  );
}

export default App;
