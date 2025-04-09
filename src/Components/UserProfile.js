import React, { useState } from 'react';
import './style.css';

const UserProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age || !formData.photo) return;

    setProfiles((prev) => [...prev, formData]);
    setFormData({ name: '', email: '', age: '', photo: null });
    document.getElementById('photo-input').value = null;
  };

  const handleDelete = (index) => {
    setProfiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="profile-container">
      <div className="form-card">
        <h2>Add User Profile</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <input type="file" id="photo-input" name="photo" accept="image/*" onChange={handleChange} required />
          <button type="submit">Add Profile</button>
        </form>
      </div>

      <div className="profiles-grid">
        {profiles.map((profile, index) => (
          <div key={index} className="profile-card">
            <button className="close-btn" onClick={() => handleDelete(index)}>×</button>
            <img src={profile.photo} alt="Profile" className="profile-pic" />
            <h3>{profile.name}</h3>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Age:</strong> {profile.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;