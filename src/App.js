
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/partials/Header';
import { BrowserRouter,Route,Routes, json } from 'react-router-dom';

function App() {
    
  return (
  <>
  <BrowserRouter>
  {/* <Header/> */}
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login  />}/>

    
  </Routes>
  </BrowserRouter>
 
 
  </>
  );
}

export default App;
