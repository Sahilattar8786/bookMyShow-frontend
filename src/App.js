import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Component/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/Home' element={<><Navbar/></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
