import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
  
function App() {
  const [users, setUsers] = useState([]);
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
      const response = await axios.post('http://localhost:3000/api/users', newUser); 
      setUsers([...users, response.data.newUser]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update an existing user
  const updateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, editingUser); 
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
      <h1 className="header">User Management</h1>

      <div className="form-section">
        <h2 className="form-header">Add User</h2>
        <input
          className="input-field"
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => handleInputChange(e, setNewUser)}
        />
        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => handleInputChange(e, setNewUser)}
        />
        <button className="submit-btn" onClick={addUser}>Add User</button>
      </div>

      <div className="list-section">
        <h2 className="list-header">Users List</h2>
        <ul className="user-list">
          {users.length > 0 ? (
            users.map(user => (
              <li className="user-item" key={user.id}>
                {editingUser && editingUser.id === user.id ? (
                  <div className="edit-section">
                    <input
                      className="input-field"
                      type="text"
                      name="name"
                      value={editingUser.name}
                      onChange={(e) => handleInputChange(e, setEditingUser)}
                    />
                    <input
                      className="input-field"
                      type="email"
                      name="email"
                      value={editingUser.email}
                      onChange={(e) => handleInputChange(e, setEditingUser)}
                    />
                    <button className="submit-btn" onClick={() => updateUser(user.id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="user-info">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <div className="user-info">
                    <button className="edit-btn" onClick={() => setEditingUser(user)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="user-item">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
