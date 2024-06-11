import logo from './logo.svg';
import './App.css';
import LogIn from './Component/Login';
import SignUp from './Component/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Movies from './Component/Movies';
import Protect from './Component/Protect';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          {/* <Route path='/movie' element={<Protect><Navbar/><Movies/></Protect>}></Route> */}
          <Route path='/movie' element={<><Navbar/><Movies/></>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
