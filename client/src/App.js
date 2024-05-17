import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import FavroitePage from './components/FavroitePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favourites" element={<FavroitePage />} />
    </Routes>
    </>
  );
}

export default App;
