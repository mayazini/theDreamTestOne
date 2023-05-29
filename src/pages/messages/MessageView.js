import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBContainer } from 'mdb-react-ui-kit';
import '../../designPages/MessageViewStyle.css';
import SendMessage from './sendMessage';

function MessageView() {
  const { messageId } = useParams();
  const [message, setMessage] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [showSendMessage, setShowSendMessage] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch projects data from your API
      fetch(`https://localhost:7225/api/Inbox/GetMessage/${messageId}`, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Message data:', data); // Add this line for debugging
          setMessage(data[0]);
          console.log('Message data22:', message); // Add this line for debugging
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
  }, [messageId]);

  const handleReplyClick = () => {
    setShowSendMessage(true);
  };

  if (!message) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <MDBContainer>
        <center>
          <MDBRow>
            <h1>Message Details</h1>
          </MDBRow>
          <MDBRow>
            <div className="message-card-wrapper">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardText>Time: {message.Time}</MDBCardText>
                  <MDBCardTitle>Sender: {message.SenderName}</MDBCardTitle>
                  <MDBCardText>Subject: {message.Subject}</MDBCardText>
                  <MDBCardText>Message: {message.Message}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBRow>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              onClick={handleReplyClick}
              className="btn btn-primary btn-block mb-4"
            >
              Reply
            </button>
          </div>
          {showSendMessage && <SendMessage />}
        </center>
      </MDBContainer>
    </div>
  );
}

export default MessageView;