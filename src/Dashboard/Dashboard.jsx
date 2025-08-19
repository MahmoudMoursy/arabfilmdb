import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from './AddForm';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in and is admin
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="dashboard">
            <AddForm />
        </div>
    );
}

export default Dashboard;
