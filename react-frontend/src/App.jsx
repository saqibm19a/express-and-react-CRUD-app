import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);  // Ensure users is initialized as an empty array
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

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

  // Add a new user
  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users', newUser);  // Correct backend URL
      setUsers([...users, response.data.newUser]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update an existing user
  const updateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, editingUser);  // Correct backend URL
      setUsers(users.map(user => (user.id === id ? response.data.updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);  // Correct backend URL
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle form input change for adding/editing users
  const handleInputChange = (e, setFunction) => {
    setFunction(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        onChange={(e) => handleInputChange(e, setNewUser)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => handleInputChange(e, setNewUser)}
      />
      <button onClick={addUser}>Add User</button>

      <h2>Users List</h2>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              {editingUser && editingUser.id === user.id ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={(e) => handleInputChange(e, setEditingUser)}
                  />
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={(e) => handleInputChange(e, setEditingUser)}
                  />
                  <button onClick={() => updateUser(user.id)}>Save</button>
                  <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {user.name} ({user.email})
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
