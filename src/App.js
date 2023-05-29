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
import MessageView from './pages/messages/MessageView';
import MyCreations from './pages/myCreations';
import Register from './pages/basic pages/register';
import Cinema from './pages/cinema/cinemaSpace';
import CreateCinema from './pages/cinema/createCinemaProject';
import './style.css';
import { UserProvider } from './pages/UserContext';
import RetailSpace from './pages/Retail/RetailSpace';

function App() {
  return (
    <UserProvider>
    <Router>
      <div className="app-wrapper">
        <Navbar />
          <Routes>          
            <Route exact path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/sendMessage' element={<SendMessage />} />
            <Route exact path="/myInbox" element={<MyInbox  />} />
            <Route path="/inbox/:messageId" element={<MessageView />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myCreations' element={<MyCreations />} />
            <Route path='/cinemaSpace' element={<Cinema />} />
            <Route path='/createProject' element={<CreateCinema />} />
            <Route path='/RetailSpace' element={<RetailSpace />} />
          </Routes>
        <Footer />
      </div>
    </Router>
    </UserProvider>
);
}

export default App;
