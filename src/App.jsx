import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};
export default App;
