// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContribuyenteList from './components/ContribuyenteList';
import ComprobantesFiscales from './components/ComprobantesFiscales'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContribuyenteList />} />
        <Route path="/comprobantes/:rncCedula" element={<ComprobantesFiscales />} />
        {/* Agrega más rutas aquí si es necesario */}
      </Routes>
    </Router>
  );
}

export default App;
