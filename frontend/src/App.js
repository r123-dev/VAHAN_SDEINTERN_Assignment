import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home'
import View from './components/View/View'
function App() {
  return (
    <div>
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/view" element={<View />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
