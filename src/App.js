import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import BrowseList from './pages/browseList';
import Itemdetails from './pages/itemdetails';
import "./App.css"
import GlobalContext from './components/globalcontext';
import Header from './components/header';


const App = () => {
  return (
    <Router>
      <GlobalContext>
        <Header/>
        <Routes>
          <Route exect={true} path='/' element={<Home />} />
          <Route exect={true} path='/browselist' element={<BrowseList />} />
          <Route exect={true} path='/itemdetails' element={<Itemdetails />} />
          {/* <Route exect ={true} path='*' element = {<Home/>}/> */}
        </Routes>
      </GlobalContext>
    </Router>

  );
};

export default App;
