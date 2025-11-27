import React, { useEffect, useState, useMemo } from 'react';
import '../App.css'
import { FiFilm, FiTv, FiUsers, FiBarChart2, FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';


const StatsCard = ({ title, value, icon }) => {
  return (
<div
  className="p-6 md:p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] border border-white/10"
  style={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 100%)' }}
>
  <div className="flex items-center justify-between">
    <div
      className="p-3 rounded-full shadow"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      {icon}
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-300 opacity-80">{title}</p>
      <p className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">{value}</p>
    </div>
    </div>
</div>

  );
};

import { axiosInstance } from '../api/axiosInstance';
import { workService } from '../api/workService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {

  const { register, handleSubmit, reset } = useForm();
  const currentUser = useSelector((s) => s.user.currentUser);

  const onSubmit = (data) => {
    axiosInstance.post('/users', data)
      .then(() => {
        toast.success("تمت إضافة المستخدم بنجاح!");
        reset();
        fetchUsers(); // تحديث قائمة المستخدمين
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || 'حدث خطأ';
        toast.error(msg);
      });
  };

  return (
    <div
      className="p-6 md:p-8 rounded-xl shadow-lg mt-8 border border-white/10"
      style={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 100%)' }}
    >
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        إضافة مستخدم جديد
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="block text-gray-300">اسم المستخدم</label>
            <input
              {...register("username", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-amber-300 transition-colors"
              type="text"
              id="username"
              placeholder="مثال: ahmed_ali"
              style={{ backgroundColor: "var(--color-grayy)" }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300">البريد الإلكتروني</label>
            <input
              {...register("email", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-amber-300 transition-colors"
              type="email"
              id="email"
              placeholder="user@example.com"
              style={{ backgroundColor: "var(--color-grayy)" }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300">كلمة المرور</label>
            <input
              {...register("password", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-amber-300 transition-colors"
              type="password"
              id="password"
              placeholder="********"
              style={{ backgroundColor: "var(--color-grayy)" }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300">الصلاحية</label>
            <select
              {...register("role", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-amber-300 transition-colors"
              id="role"
              style={{ backgroundColor: "var(--color-grayy)" }}
            >
              <option value="admin">Admin</option>
              <option value="publisher">Publisher</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
        <button
          type="submit"
            className="text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          إضافة المستخدم
        </button>
        </div>

        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

const Sidebar = () => {
        const navigate = useNavigate();

  return (
    <div className=" text_white w-64 p-5 space-y-8 flex flex-col" style={{backgroundColor: 'var(--color-secondary)' }}>
      <div className="flex items-center space-x-3 space-x-reverse">
        <FiBarChart2 size={30} className="text-yellow-300 mx-4" />
        <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
      </div>
      <nav className="flex-grow">
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center p-3 rounded-lg bg-secondary text-white font-bold">
              <FiBarChart2 className="ml-3 text-accent" />
              الإحصائيات
            </a>  
          </li>
         
        </ul>
      </nav>
      <div className="text-center text-gray-500 text-xs">
        <p>&copy; 2025 Your Movie Site</p>
      </div>
    </div>
  );
};



const AdminDashboard = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({ films: 0, series: 0, total: 0 });
  const [q, setQ] = useState('');
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchWorks = () => {
    setLoading(true);
    axiosInstance.get('/works')
      .then(res => {
        const data = res.data || [];
        setWorks(data);
        const films = data.filter(w => w.type === 'film').length;
        const series = data.filter(w => w.type === 'series').length;
        const total = data.length;
        setCounts({ films, series, total });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const fetchUsers = () => {
    setUsersLoading(true);
    axiosInstance.get('/users')
      .then(res => setUsers(res.data || []))
      .catch(() => {})
      .finally(() => setUsersLoading(false));
  };

  useEffect(() => {
    fetchWorks();
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return works;
    const t = q.trim().toLowerCase();
    return works.filter(w =>
      (w.nameArabic || '').toLowerCase().includes(t) ||
      (w.nameEnglish || '').toLowerCase().includes(t) ||
      String(w.year || '').includes(t) ||
      (w.type || '').toLowerCase().includes(t)
    );
  }, [q, works]);

  const deleteUser = (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    axiosInstance.delete(`/users/${id}`).then(() => {
      fetchUsers(); // تحديث قائمة المستخدمين
      toast.success('تم حذف المستخدم بنجاح');
    }).catch(() => {
      toast.error('حدث خطأ أثناء حذف المستخدم');
    });
  };

  const updateUserRole = (id, role) => {
    axiosInstance.patch(`/users/${id}`, { role }).then((res) => {
      fetchUsers(); // تحديث قائمة المستخدمين
      toast.success('تم تحديث دور المستخدم بنجاح');
    }).catch(() => {
      toast.error('حدث خطأ أثناء تحديث دور المستخدم');
    });
  };

  return (
    <div className="flex h-screen " dir="rtl" style={{backgroundColor: 'var(--color-dark)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-6 md:p-8">
          <div className="flex items-baseline justify-between mb-6">
 <button
            onClick={() => {
              navigate('/AddForm');
            }}
            className="w-58 px-1 py-2 rounded-xl font-bold transition-all duration-300 text-white hover:shadow-lg"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            أضافه
          </button>            <span className="text-sm text-white">لوحة تحكم الإدارة</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <StatsCard title="إجمالي الأفلام" value={counts.films.toLocaleString()} icon={<FiFilm size={24} className="text-black" />} />
            <StatsCard title="إجمالي المسلسلات" value={counts.series.toLocaleString()} icon={<FiTv size={24} className="text-black" />} />
            <StatsCard title="إجمالي الأعمال" value={counts.total.toLocaleString()} icon={<FiBarChart2 size={24} className="text-black" />} />
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">كل الأعمال</h2>
              <div className="relative w-full max-w-sm">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e)=>setQ(e.target.value)}
                  placeholder="ابحث بالعنوان أو النوع أو السنة..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-amber-300"
                  style={{ backgroundColor: 'var(--color-grayy)' }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="max-h-[420px] overflow-y-auto">
                <table className="w-full text-right">
                  <thead className="bg-black/30 text-white sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3">العنوان (ع)</th>
                      <th className="px-4 py-3">العنوان (En)</th>
                      <th className="px-4 py-3">السنة</th>
                      <th className="px-4 py-3">النوع</th>
                      <th className="px-4 py-3">تحكم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr><td colSpan="4" className="px-4 py-6 text-center text-white">جاري التحميل...</td></tr>
                    )}
                    {!loading && filtered.length === 0 && (
                      <tr><td colSpan="4" className="px-4 py-6 text-center text-white">لا توجد أعمال</td></tr>
                    )}
                    {!loading && filtered.map((w, idx) => (
                      <tr key={w._id} className={"border-t border-gray-700 " + (idx % 2 === 0 ? 'bg-black/5' : '')}>
                        <td className="px-4 py-3 text-white">{w.nameArabic}</td>
                        <td className="px-4 py-3 text-gray-300">{w.nameEnglish}</td>
                        <td className="px-4 py-3 text-gray-300">{w.year}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-bold text-black" style={{ backgroundColor: 'var(--color-accent)' }}>
                            {w.type === 'film' ? 'فيلم' : 'مسلسل'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
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
                                       toast.success('تم حذف العمل بنجاح');
                                     })
                                    .catch(error => {
                                      console.error('Error deleting work:', error);
                                      toast.error('حدث خطأ أثناء حذف العمل');
                                    });
                                }
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">المستخدمون</h2>
            </div>
            <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="max-h-[420px] overflow-y-auto">
                <table className="w-full text-right">
                  <thead className="bg-black/30 text-white sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3">الاسم</th>
                      <th className="px-4 py-3">البريد</th>
                      <th className="px-4 py-3">الدور</th>
                      <th className="px-4 py-3">تحكم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading && (
                      <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-300">جاري التحميل...</td></tr>
                    )}
                    {!usersLoading && users.length === 0 && (
                      <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-300">لا يوجد مستخدمون</td></tr>
                    )}
                    {!usersLoading && users.map((u, idx) => (
                      <tr key={u._id} className={"border-top border-gray-700 " + (idx % 2 === 0 ? 'bg-black/5' : '')}>
                        <td className="px-4 py-3 text-white">{u.username}</td>
                        <td className="px-4 py-3 text-gray-300">{u.email}</td>
                        <td className="px-4 py-3 text-gray-300">
                          <select value={u.role} onChange={(e)=>updateUserRole(u._id, e.target.value)} className="bg-black/20 text-white px-2 py-1 rounded border border-gray-600">
                            <option value="admin">admin</option>
                            <option value="publisher">publisher</option>
                            <option value="user">user</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={()=>deleteUser(u._id)} className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <AddUserForm />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
