import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch Token from LocalStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            alert("Please log in first!");
            navigate('/');
            return;
        }
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // We ask the backend for the users. Spring Security will check the token!
            const response = await fetch('http://localhost:8080/api/users', {
                headers: { 'Authorization': `Bearer ${token}` } 
            });
            
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else if (response.status === 403) {
                // If Spring Boot returns 403, this token does NOT belong to an ADMIN
                alert("Access Denied! You are logged in as a normal user. You must log in with the Admin account!");
                navigate('/');
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to completely delete user: ${userName}?`)) return;

        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                alert("User deleted successfully.");
                setUsers(users.filter(user => user.id !== userId)); 
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
            <Navbar />
            
            <div style={{ padding: '120px 40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#d4af37', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
                    Admin Control Center
                </h1>
                
                <h3 style={{ marginTop: '20px' }}>Total Registered Users: {users.length}</h3>

                {loading ? <p>Loading system data...</p> : (
                    <table style={{ width: '100%', marginTop: '30px', borderCollapse: 'collapse', backgroundColor: '#111' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#222', color: '#d4af37', textAlign: 'left' }}>
                                <th style={{ padding: '15px' }}>ID</th>
                                <th style={{ padding: '15px' }}>Name</th>
                                <th style={{ padding: '15px' }}>Email</th>
                                <th style={{ padding: '15px' }}>Role</th>
                                <th style={{ padding: '15px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '15px' }}>{user.id}</td>
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{user.name}</td>
                                    <td style={{ padding: '15px', color: '#aaa' }}>{user.email}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ 
                                            padding: '5px 10px', 
                                            borderRadius: '20px', 
                                            fontSize: '12px',
                                            backgroundColor: user.role === 'ADMIN' ? '#d4af37' : '#333',
                                            color: user.role === 'ADMIN' ? '#000' : '#fff'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        {user.role !== 'ADMIN' && (
                                            <button 
                                                onClick={() => handleDelete(user.id, user.name)}
                                                style={{ padding: '8px 15px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                            >
                                                Delete User
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;