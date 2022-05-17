import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import AccountPage from './pages/Account/Account';
import AdminPage from './pages/Admin/Admin';
import ProfilePage from './pages/Account/Profile';
import FullPageLogin from './pages/FullPageLogin';
import FullPageRegister from './pages/FullPageRegister';

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<FullPageLogin />} />
        <Route path="/register" element={<FullPageRegister />} />
       
      </Routes>
    </div>
  );
}

export default App;
