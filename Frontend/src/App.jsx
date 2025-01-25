import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Main from './Components/Main';
// import Signup from './Signup';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
              <Route path='/' element= {<Main/>}/>
                <Route path="/login" element={<Login />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
               
            </Routes>
        </Router>
    );
}

export default App;
