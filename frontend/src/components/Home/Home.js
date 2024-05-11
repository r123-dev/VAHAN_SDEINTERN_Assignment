import React from 'react'
import { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import NavBar from '../Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
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
                toast.error('Failed to create user');
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success('Added details successfully');
                setFormData({
                    id1: '',
                    name: '',
                    email: '',
                    mobileNumber: '',
                    dateOfBirth: ''
                });
            }navigate('/');
            
        } catch (error) {
            //toast.error('Failed to create user');
            navigate('/');
        }
    };
         
    return (
       
        <div className="container" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
            
            <h2>Person Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="serialNumber">Id_Number:</label>
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
                <label htmlFor="dob">Date of Birth (DD-MMM-YYYY):</label>
                    <input type="text" id="dob" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />     </div>
                <button type="submit" className="btn">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Home;

