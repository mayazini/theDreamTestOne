import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/basic pages/home';
import Login from './pages/basic pages/login';
import Footer from './components/footer';
import SendMessage from './pages/messages/sendMessage';
import MyInbox from './pages/messages/myInbox';
import MessageView from './pages/messages/MessageView';
import MyCreations from './pages/myCreations';
import Register from './pages/basic pages/register';
import Cinema from './pages/cinema/cinemaSpace';
import './style.css';
import { UserProvider } from './pages/UserContext';
import RetailSpace from './pages/Retail/RetailSpace';
import SentMessages from './pages/messages/UsersSentMessages';
import MessagesInTrash from './pages/messages/MessagesInTrash';
import AdminCharts from './pages/Admin/AdminCharts';
import UserList from './pages/Admin/UserList';
import ViewApplicants from './pages/ViewApplicants';
import About from './pages/basic pages/About';
function App() {
  return (
    <UserProvider>
    <Router>
      <div className="app-wrapper">
        <div className="page-container content-container">
        <Navbar />
          <Routes>          
            <Route exact path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sendMessage' element={<SendMessage />} />
            <Route exact path="/myInbox" element={<MyInbox  />} />
            <Route path="/inbox/:messageId" element={<MessageView />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myCreations' element={<MyCreations />} />
            <Route path='/About' element={<About />} />
            <Route path='/cinemaSpace' element={<Cinema />} />
            <Route path='/RetailSpace' element={<RetailSpace />} />
            <Route path='/SentMessages' element={<SentMessages />} />
            <Route path='/MessagesInTrash' element={<MessagesInTrash />} />
            <Route path='/AdminCharts' element={<AdminCharts />} />
            <Route path='/UserList' element={<UserList />} />
            <Route exact path="/ViewApplicants/:projectId" element={<ViewApplicants />}  />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </UserProvider>
);
}

export default App;
