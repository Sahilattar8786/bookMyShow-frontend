import './App.css';
import LogIn from './Component/User/Login';
import SignUp from './Component/User/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Movies from './Component/Movie/Movies';
import Protect from './Component/Protect';
import 'react-toastify/dist/ReactToastify.css';
import Show from './Component/Show/Show';
import Theater from './Component/Theater/Theater';
import ShowMovie from './Component/Movie/ShowMovie';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/movie' element={<Protect><Navbar/><Movies/></Protect>}></Route>
          <Route path="/show" element={<Protect><Navbar/><Show/></Protect>}></Route>
          <Route path='theater' element={<><Navbar/><Theater/></>}></Route>
          <Route path='/MovieDetail/:id' element={<><Navbar/><ShowMovie/></>} ></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
