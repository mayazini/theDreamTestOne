import React, { useContext, useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEnvelopeOpenText } from 'react-icons/fa';

function MyInbox() {
  const [inboxData, setInboxData] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch inbox data from the API
  useEffect(() => {
    if (user) {
      // Fetch projects data from your API
      fetch('https://localhost:7225/api/Inbox/Inbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username })
      })
        .then((response) => response.json())
        .then((data) => {
          setInboxData(data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
  }, [user]);

  // Handle click on "More" button
  const handleMoreClick = (messageId) => {
    navigate(`/inbox/${messageId}`);
  };

  // Handle delete message
  const handleDeleteMessage = (messageId) => {
    // Delete message logic
    fetch(`https://localhost:7225/api/Inbox/MoveToTrash/${messageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the message was deleted successfully
        if (data.message) {
          // Remove the deleted message from the inboxData state
          const updatedInboxData = inboxData.filter((item) => item.Id !== messageId);
          setInboxData(updatedInboxData);
          navigate('/myInbox')
        } else {
          console.error('Error:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  // Handle click on "Sent Messages" button
  const handleSentMessagesClick = () => {
    navigate('/SentMessages');
  };

  // Handle click on "Trash" button
  const handleTrashClick = () => {
    navigate('/MessagesInTrash');
  };

  return (
    <div className="content-wrapper">
      <div className="mb-3">
        
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Sender</th>
            <th scope="col">Subject</th>
            <th scope="col">Time</th>
            <th scope="col">Actions</th>
            <MDBBtn color="info" size="sm" onClick={handleSentMessagesClick}>
          <FaEnvelopeOpenText className="me-1" />
          Sent Messages
        </MDBBtn>
        <MDBBtn color="danger" size="sm" onClick={handleTrashClick} className='text-black'>
          <FaTrash className="me-1" />
          Trash
        </MDBBtn>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {inboxData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`https://mdbootstrap.com/img/new/avatars/${index + 1}.jpg`}
                    alt=""
                    style={{ width: '45px', height: '45px' }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{item.SenderName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{item.Subject}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{item.Time}</p>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm" onClick={() => handleMoreClick(item.Id)}>
                  More
                </MDBBtn>
                <MDBBtn color="danger" rounded size="sm" onClick={() => handleDeleteMessage(item.Id)}>
                  move to trash<FaTrash />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default MyInbox;