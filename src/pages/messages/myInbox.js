import React, {  useContext, useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { UserContext } from '../UserContext';

function MyInbox() {
  const [inboxData, setInboxData] = useState([]);
  const { user,setUser } = useContext(UserContext);


  // Fetch inbox data from the API
  useEffect(() => {
    if (user) {
      // Fetch projects data from your API
      fetch('https://localhost:7225/api/Inbox/Inbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username : user.username })
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

  return (
    <div className="content-wrapper">
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Sender</th>
          <th scope='col'>Subject</th>
          <th scope='col'>Message</th>
          <th scope='col'>Time</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {inboxData.map((item, index) => (
          <tr key={index}>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src={`https://mdbootstrap.com/img/new/avatars/${index + 1}.jpg`}
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{item.SenderName}</p>
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>{item.Subject}</p>
            </td>
            <td>
              <p className='fw-normal mb-1'>{item.Message}</p>
            </td>
            <td>
              <p className='fw-normal mb-1'>{item.Time}</p>
            </td>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Edit
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