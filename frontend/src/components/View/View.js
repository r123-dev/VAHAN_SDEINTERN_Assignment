import React, { useState, useEffect } from 'react';
import './View.css';

const View = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/get-users');
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-user/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('User deleted successfully');
        // Refresh data after deletion
        fetchData();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="data-list">
      <h2>User Data</h2>
      <ul>
        {userData.map(user => (
          <li key={user.id}>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Mobile:</strong> {user.mobile}
            </div>
            <div>
              <strong>Date of Birth:</strong> {user.dob}
            </div>
            <div className="buttons">
              <button onClick={() => handleUpdate(user)}>Update</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Update User Information</h2>
            {/* Update form can go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
