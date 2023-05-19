import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/basic pages/home';
import Login from './pages/basic pages/login';
import About from './pages/basic pages/about';
import Footer from './components/footer';
import SendMessage from './pages/messages/sendMessage';
import MyInbox from './pages/messages/myInbox';
import MyCreations from './pages/myCreations';
import Register from './pages/basic pages/register';
import Cinema from './pages/cinemaSpace';
import './style.css';


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
          <Routes>
          
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/sendMessage' element={<SendMessage />} />
            <Route path='/myInbox' element={<MyInbox />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myCreations' element={<MyCreations />} />
            <Route path='/cinemaSpace' element={<Cinema />} />
          </Routes>
        <Footer />
      </div>
    </Router>

);
}

export default App;
