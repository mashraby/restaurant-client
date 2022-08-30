import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Restaurant from './Pages/Restaurant/Restaurant';
import Food from './Pages/Foods/Food';
import Notfound from './Pages/Notfound/Notfound';
import Corzinka from './Pages/Corzinka/Corzinka';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/corzinka' element={<Corzinka />} />
        <Route path='/restaurants/:ctgId' element={<Restaurant />} />
        <Route path='/foods/:rstId' element={<Food />} /> 
        <Route path='/*' element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;