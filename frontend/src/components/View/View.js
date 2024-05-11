import React, { useState, useEffect } from 'react';
import './View.css';
import NavBar from '../Navbar/Navbar';
import Comp from '../comp/Comp';
import { useNavigate } from 'react-router-dom';
function View() {
    //const [users, setUsers] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user for update
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
    
   const navigate=useNavigate();
    useEffect(() => {
        // Function to fetch user details from the backend
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/entry`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                // const formattedData = data.map(user => ({
                //     ...user,
                //     dateOfBirth: new Date(user.dateOfBirth).toISOString().split('T')[0]
                // }));
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        // Call the fetchUsers function when the component mounts
        fetchUsers();

        // Cleanup function to remove event listeners or timers if needed
        return () => {
            // Cleanup code here
        };
    }, []); // Run this effect only once when the component mounts

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/entry/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            // Remove the deleted user from the list
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            window.location.reload();
            return false; // Indicate that the event is handled synchronously
        } catch (error) {
            console.error('Error deleting user:', error);
            return false; // Indicate that the event is handled synchronously
        }
    };
    

    const handleUpdate = (user) => {
        // Set the selected user and show the modal
        setSelectedUser(user);
        setShowModal(true);
    };

    // Function to handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleUpdateUser = async (userId, updatedUserData) => {
        // Extracting the dateOfBirth from updatedUserData
        const { dateOfBirth, ...restUserData } = updatedUserData;
    
        try {
            // Format the dateOfBirth without timezone information
            const formattedDateOfBirth = new Date(dateOfBirth).toISOString().split('T')[0];
    
            const response = await fetch(`http://localhost:3000/api/entry/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...restUserData, dateOfBirth: formattedDateOfBirth })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
    
            // If the response is successful, log the updated user data from the server
            const updatedUser = await response.json();
            console.log('Updated user data:', updatedUser);
    
            // Update the user list in the state with the updated user data
            const updatedUsers = users.map(user => {
                if (user.id1 === userId) {
                    return { ...user, ...updatedUserData };
                }
                return user;
            });
            setUsers(updatedUsers);
            setShowModal(false); // Close the modal after updating
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    // Function to handle form submission in the modal
    const handleModalSubmit = async (formData) => {
        // Perform update operation with formData
        // You can use fetch or any other method to update user info
        console.log('Updating user:', formData);
        setShowModal(false); // Close the modal after submission
    };

    return (
        <div className="user-list-container">
            
            <h2>User List</h2>
            <div className="user-header">
                <div>ID Name</div>
                <div>Email</div>
                <div>Mobile Number</div>
                <div>Date of Birth</div>
                <div>Actions</div>
            </div>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id1} className="user-item">
                       
                        <div>{user.id1} {user.name}</div>
                        <div>{user.email}</div>
                        <div>{user.mobileNumber}</div>
                        <div>{user.dateOfBirth}</div>
                        <div className="user-actions">
                            <button onClick={() => handleDelete(user.id1)}>Delete</button>
                            <button onClick={() => handleUpdate(user)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            {showModal && (
                <Comp
                    user={selectedUser}
                    userId={selectedUser.id1}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateUser}
                />
            )}
        </div>
    );
}

export default View;


