import React from 'react'
import { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
const backgroundImageUrl = 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-padrinan-255379.jpg&fm=jpg';
function Home() {
  const navigate=useNavigate();
    const [formData, setFormData] = useState({
        id1: '',
        name: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
              
                throw new Error('Failed to submit form');
                 
              }

            // Optionally, you can handle the response from the backend here
            const data = await response.json();
            console.log('Form submitted successfully:', data);
            navigate('/');
        } catch (error) {
          navigate('/');
            console.error('Error submitting form:', error);
        }
    };
         
    return (
       
        <div className="container" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="serialNumber">Serial Number:</label>
                    <input type="text" id="id1" name="id1" value={formData.id1} onChange={handleChange} required />
                </div>
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
                <label htmlFor="dob">Date of Birth (YYYY-MM-DD):</label>
                    <input type="text" id="dob" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />     </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}

export default Home;

