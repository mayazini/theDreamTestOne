import React, { useEffect,useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContext } from '../UserContext';
import ProtectedRoute
 from '../../components/ProtectedRoute';
function SendMessage() {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recieverName, setRecieverName] = useState('');
  const [subject, setSubject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setSenderName(user.username);
    }
  }, [user]);

  const handleSubmission = (event) => {
    event.preventDefault();
    if (user) {
      const messageData = {
        message,
        senderName,
        recieverName,
        subject
      };
      inputData(messageData);
    } else {
      setErrorMessage('You need to be logged in to send a message.');
    }
  };

  const inputData = (messageData) => {
    fetch('https://localhost:7225/api/Inbox/SendMessage', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    })
      .then((response) => {
        if (!response.ok) {
          if(response==="user doesn't exist")
            throw new Error('Can\'t send a message to a user that doesn\'t exist');
          throw new Error('Sending a message failed');
        }
        setErrorMessage('Sent message successfully. Redirecting to your inbox page...');
        setTimeout(() => {
          navigate('/myInbox');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setErrorMessage('Sending a message failed. Please try again.');
      });
  };

  return (
    <ProtectedRoute allowedRoles={['admin','loggedIn']}>
    <div className="content-wrapper">
    <div class="col-lg-6 mb-5 mb-lg-0">
    <h1>Send Message:</h1>
    <div style={{background: "hsla(0, 0%, 100%, 0.55",
    backdropFilter: "blur(30px)",
    zIndex: "1"}}className="card rounded-7 me-lg-n5">
      <div className="card-body p-lg-5 shadow-5">
        <form>
          
          <div className="form-group mt-3">
          <label className="form-label" for="form4Example1">subject: </label>
          <input
                    type="text"
                    className="form-control mt-1"
                    id="subject"               
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
           
          </div>
  
          
          <div className="form-group mt-3">
          <label className="form-label" for="form4Example2">To:</label>
          <input
                    type="text"
                    className="form-control mt-1"
                    id="reciever"
                    value={recieverName}
                    onChange={(e) => setRecieverName(e.target.value)}
                  />
          
          </div>
  
          
          <div className="form-group mt-3">
          <label className="form-label" for="form4Example3">Message:</label>
          <textarea
                    className="form-control mt-1"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                  ></textarea>
           
          </div>
 
          <div className="d-grid gap-2 mt-3">
                  <button
                    type="submit"
                    onClick={handleSubmission}
                    className="btn btn-primary btn-block mb-4"
                  >
                   Send
                  </button>
                  {errorMessage && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errorMessage}
                    </div>
                  )}
                </div>
        </form>
      </div>
    </div>  
  </div>
  </div>
  </ProtectedRoute>
  )
}

export default SendMessage
