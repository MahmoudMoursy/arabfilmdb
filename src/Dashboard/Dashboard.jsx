import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from './AddForm';
import AdminDashboard from './AdminDashboard';
import { workService } from '../api/workService';

function Dashboard() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [works, setWorks] = useState([]);

    const fetchWorks = () => {
        workService.getUserWorks().then(setWorks).catch(() => {});
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        setRole(user.role);
        // Fetch works (admin sees all; publisher sees own - backend enforces)
        fetchWorks();
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
                      <li key={w._id} className="text-white border border-gray-700 rounded p-2 flex justify-between items-center">
                        <span>{w.nameArabic} - {w.year}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => navigate(`/dashboard/edit/${w._id}`)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                          >
                            تعديل
                          </button>
                                                     <button 
                             onClick={() => {
                               if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
                                 workService.deleteWork(w._id)
                                   .then(() => {
                                     fetchWorks(); // تحديث القائمة بالكامل
                                     alert('تم حذف العمل بنجاح');
                                   })
                                   .catch(error => {
                                     console.error('Error deleting work:', error);
                                     alert('حدث خطأ أثناء حذف العمل');
                                   });
                               }
                             }}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                          >
                            حذف
                          </button>
                        </div>
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
