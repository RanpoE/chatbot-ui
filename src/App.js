import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import { Character, Locator, Profile, Settings } from './pages';
import 'leaflet/dist/leaflet.css';
import Main from './pages/Main';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/character/:id' element={<Character />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/locator' element={<Locator />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
