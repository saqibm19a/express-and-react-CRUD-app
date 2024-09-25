import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <h2>Add User</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
      />

      <h2>Users List</h2>
      <ul>
        {users.length > 0 ? users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        )) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
