import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import AddSong from './components/AddSong';
import TopSongs from './components/TopSongs';
import AddArtists from './components/AddArtists';

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  return (
  <>

     <BrowserRouter>

         <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/add-song" Component={AddSong} />
          <Route exact path="/add-artist" Component={AddArtists} />

          </Routes>
    </BrowserRouter>
    </>


  );
  }

  export default App;