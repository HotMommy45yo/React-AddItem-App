import React from 'react';
import './App.css';
import Nav from './Nav';
import AddItem from './AddItem/AddItem';
import Shop from './Shop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Item from './ItemDetail';
import Home from './Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/shop/:id" element={<Item/>} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
