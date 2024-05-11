import React, { useState } from 'react';
import './Comp.css'
function Comp({ user,userId, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        dateOfBirth: user.dateOfBirth
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onUpdate function with the updated user data
        onUpdate(userId, formData);
        onClose(); // Close the modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth (YYYY-MM-DD):</label>
                        <input type="text" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Comp;
