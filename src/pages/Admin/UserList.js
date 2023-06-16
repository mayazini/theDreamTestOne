import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:7225/api/User/GetAllUsers');
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteUser = async (userName) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      try {
        await fetch(`https://localhost:7225/api/User/DeleteUser/${userName}`, { method: 'DELETE' });
        fetchUsers();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>LinkedInLink</th>
            <th>Admin</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Id}>
              <td>{user.userName}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.linkedInLink}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.userName)}>
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
