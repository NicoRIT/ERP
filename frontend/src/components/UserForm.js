import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ addUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/users', formData)
      .then(response => {
        addUser({ id: response.data.id, ...formData });
        setFormData({ name: '', email: '' });
      })
      .catch(error => {
        console.error('There was an error posting the data!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
