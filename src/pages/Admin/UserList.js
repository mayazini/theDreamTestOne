import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      const response = await fetch('https://localhost:7225/api/User/GetAllUsers', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Send a delete request to the server to delete the user
      await fetch(`https://your-api-url.com/api/DeleteUser/${userId}`, { method: 'DELETE' });

      // Update the user list by fetching the updated data
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
