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
import './style.css';


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/sendMessage' element={<SendMessage />} />
            <Route path='/myInbox' element={<MyInbox />} />
            <Route path='/myCreations' element={<MyCreations />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>

);
}

export default App;
