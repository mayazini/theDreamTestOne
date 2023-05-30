import React, { useContext, useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEnvelopeOpenText } from 'react-icons/fa';

function UsersSentMessages() {

  const [data, setData] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch inbox data from the API
  useEffect(() => {
    if (user) {
      // Fetch projects data from your API
      fetch('https://localhost:7225/api/Inbox/GetTrashByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username })
      })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
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
    fetch(`https://localhost:7225/api/Inbox/DeleteMessage/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((RetrievedData) => {
        // Check if the message was deleted successfully
        if (RetrievedData.message) {
          // Remove the deleted message from the inboxData state
          const updatedInboxData = data.filter((item) => item.Id !== messageId);
          setData(updatedInboxData);
        } else {
          console.error('Error:', RetrievedData.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
    <div className="content-wrapper">
      <div className="mb-3">
        
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Reciever</th>
            <th scope="col">Subject</th>
            <th scope="col">Time</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data.map((item, index) => (
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
                    <p className="fw-bold mb-1">{item.recieverName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{item.subject}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{item.time}</p>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm" onClick={() => handleMoreClick(item.id)}>
                  More
                </MDBBtn>
                <MDBBtn color="danger" rounded size="sm" onClick={() => handleDeleteMessage(item.id)}>
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

export default UsersSentMessages;