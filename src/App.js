import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import { Character, Home, Profile, Settings } from './pages';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/character/:id' element={<Character />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
