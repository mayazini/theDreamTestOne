import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import About from './pages/about';
import Footer from './components/footer';
import SendMessage from './pages/sendMessage';
import MyInbox from './pages/myInbox';
import MyCreations from './pages/myCreations';
import Register from './pages/register';
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
          </Routes>
        <Footer />
      </div>
    </Router>

);
}

export default App;
