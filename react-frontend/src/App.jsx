import React, { useState } from 'react';

function App() {
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default App;
