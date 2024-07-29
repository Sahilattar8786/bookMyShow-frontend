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
import ShowDetail from './Component/Show/ShowDetail';
import TheaterDetail from './Component/Theater/TheaterDetail';
import BookingPage from './Component/booking/booking';
import TicketsList from './Component/booking/MyTicket';
import Home from './Component/Admin/Home';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AdminNavbar from './Component/Admin/AdminNavbar';
import AdminTheater from './Component/Admin/Theater/AdminTheater';
import AdminProtect from './Component/AdminProtect';
import AdminMovies from './Component/Admin/Movies/AdminMovies';
import AdminShow from './Component/Admin/Show/AdminShow';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/movie' element={<Protect><Navbar/><Movies/></Protect>}></Route>
          <Route path='/MovieDetail/:id' element={<><Navbar/><ShowMovie/></>} ></Route>
          <Route path="/show" element={<Protect><Navbar/><Show/></Protect>}></Route>
          <Route path='/showDetail/:id' element={<><Navbar/><ShowDetail/></>} ></Route>
          <Route path='theater' element={<><Navbar/><Theater/></>}></Route>
          <Route path='/theatreDetail/:id' element={<Protect><Navbar/><TheaterDetail/></Protect>}></Route>
          <Route path="/booking/:showId" element={<Protect><Navbar/><BookingPage/></Protect>}></Route>
          <Route path="/myTicket" element={<Protect><Navbar/><TicketsList/></Protect>}></Route>
         
          {/* Admin Routes */}
          <Route path='/admin' element={<AdminProtect><Home/></AdminProtect>}>
            <Route path='movies' element={<AdminProtect><AdminMovies/></AdminProtect>} />
            <Route path='theater' element={<AdminProtect><AdminTheater/></AdminProtect>} />
            <Route path='show' element={<AdminProtect><AdminShow/></AdminProtect>} ></Route>
            {/* Add other admin routes here */}
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
