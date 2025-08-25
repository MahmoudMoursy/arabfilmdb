import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from './AddForm';
import AdminDashboard from './AdminDashboard';
import { workService } from '../api/workService';

function Dashboard() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [works, setWorks] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        setRole(user.role);
        // Fetch works (admin sees all; publisher sees own - backend enforces)
        workService.getAllWorks().then(setWorks).catch(() => {});
    }, [navigate]);

    return (
        <div className="dashboard">
            {role == 'admin' ? (
              <>
                <AdminDashboard />
              </>
            ) : role === 'publisher' ? (
              <>
                <AddForm />
                {/* render own works list */}
                <div className="p-4">
                  <h2 className="text-xl text-white mb-2">أعمالي</h2>
                  <ul className="space-y-2">
                    {works.map(w => (
                      <li key={w._id} className="text-white border border-gray-700 rounded p-2">
                        {w.nameArabic} - {w.year}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : null}
        </div>
    );
}

export default Dashboard;
