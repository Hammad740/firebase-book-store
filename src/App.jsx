import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/Navbar';
import List from './pages/List';
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/book/list" element={<List />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};
export default App;
