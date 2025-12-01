import React, { useEffect, useState, useMemo } from 'react';
import '../App.css'
import { FiFilm, FiTv, FiUsers, FiBarChart2, FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';


// مكون المؤشر الدائري
const CircularProgress = ({ percentage, color, label, value }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: '180px', height: '180px' }}>
        <svg className="transform -rotate-90" width="180" height="180">
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-xs text-gray-400 mt-1">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-300">{label}</p>
    </div>
  );
};

// مكون الرسم البياني الشريطي
const BarChart = ({ data, maxValue }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">{item.label}</span>
            <span className="text-sm font-bold text-white">{item.value}</span>
          </div>
          <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                background: item.color,
                boxShadow: `0 0 10px ${item.color}`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};


const StatsCard = ({ title, value, icon }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;
    let start = 0;
    const duration = 1500;
    const increment = numValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numValue) {
        setDisplayValue(numValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className="p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-white/10 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 100%)' }}
    >
      {/* Background glow effect */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
      
      <div className="flex items-center justify-between relative z-10">
        <div
          className="p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          style={{ 
            backgroundColor: "var(--color-accent)",
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
          }}
        >
          {icon}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-300 opacity-80 mb-1">{title}</p>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
            {displayValue.toLocaleString()}
          </p>
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

const Sidebar = ({ counts, usersCount, activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-72 min-h-screen p-6 flex flex-col shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, rgba(31, 41, 55, 0.98) 0%, rgba(17, 24, 39, 0.98) 100%)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Header Section */}
      <div 
        className="flex items-center gap-3 p-4 mb-8 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        <FiBarChart2 
          size={32} 
          style={{ 
            color: 'var(--color-accent)',
            filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))'
          }} 
        />
        <h1 className="text-2xl font-extrabold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
          لوحة التحكم
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 space-y-6">
        {/* القسم الأول: الإحصائيات */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
            الإحصائيات
          </p>
          <ul className="space-y-1">
            <li>
              <a 
                href="#stats"
                onClick={(e) => { e.preventDefault(); setActiveSection('stats'); }}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                  activeSection === 'stats' 
                    ? 'text-white font-bold shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:transform hover:translate-x-1'
                }`}
                style={{
                  background: activeSection === 'stats' 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)'
                    : 'transparent',
                  borderLeft: activeSection === 'stats' ? '3px solid var(--color-accent)' : 'none'
                }}
              >
                <FiBarChart2 
                  size={20} 
                  style={{ color: activeSection === 'stats' ? 'var(--color-accent)' : 'inherit' }}
                />
                <span>نظرة عامة</span>
              </a>
            </li>
          </ul>
        </div>

        {/* القسم الثاني: إدارة المحتوى */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
            إدارة المحتوى
          </p>
          <ul className="space-y-1">
            <li>
              <a 
                href="#movies"
                onClick={(e) => { e.preventDefault(); setActiveSection('movies'); }}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                  activeSection === 'movies' 
                    ? 'text-white font-bold shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:transform hover:translate-x-1'
                }`}
                style={{
                  background: activeSection === 'movies' 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)'
                    : 'transparent',
                  borderLeft: activeSection === 'movies' ? '3px solid var(--color-accent)' : 'none'
                }}
              >
                <FiFilm 
                  size={20} 
                  style={{ color: activeSection === 'movies' ? 'var(--color-accent)' : 'inherit' }}
                />
                <span>الأفلام</span>
              </a>
            </li>
            <li>
              <a 
                href="#series"
                onClick={(e) => { e.preventDefault(); setActiveSection('series'); }}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                  activeSection === 'series' 
                    ? 'text-white font-bold shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:transform hover:translate-x-1'
                }`}
                style={{
                  background: activeSection === 'series' 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)'
                    : 'transparent',
                  borderLeft: activeSection === 'series' ? '3px solid var(--color-accent)' : 'none'
                }}
              >
                <FiTv 
                  size={20} 
                  style={{ color: activeSection === 'series' ? 'var(--color-accent)' : 'inherit' }}
                />
                <span>المسلسلات</span>
              </a>
            </li>
          </ul>
        </div>

        {/* القسم الثالث: المستخدمون */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
            المستخدمون
          </p>
          <ul className="space-y-1">
            <li>
              <a 
                href="#users"
                onClick={(e) => { e.preventDefault(); setActiveSection('users'); }}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                  activeSection === 'users' 
                    ? 'text-white font-bold shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:transform hover:translate-x-1'
                }`}
                style={{
                  background: activeSection === 'users' 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)'
                    : 'transparent',
                  borderLeft: activeSection === 'users' ? '3px solid var(--color-accent)' : 'none'
                }}
              >
                <FiUsers 
                  size={20} 
                  style={{ color: activeSection === 'users' ? 'var(--color-accent)' : 'inherit' }}
                />
                <span>إدارة المستخدمين</span>
              </a>
            </li>
          </ul>
        </div>

        {/* القسم الرابع: البحث */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
            أدوات
          </p>
          <ul className="space-y-1">
            <li>
              <a 
                href="#search"
                onClick={(e) => { e.preventDefault(); setActiveSection('search'); }}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                  activeSection === 'search' 
                    ? 'text-white font-bold shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:transform hover:translate-x-1'
                }`}
                style={{
                  background: activeSection === 'search' 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)'
                    : 'transparent',
                  borderLeft: activeSection === 'search' ? '3px solid var(--color-accent)' : 'none'
                }}
              >
                <FiSearch 
                  size={20} 
                  style={{ color: activeSection === 'search' ? 'var(--color-accent)' : 'inherit' }}
                />
                <span>البحث المتقدم</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mini Stats Cards */}
      <div className="mt-auto pt-6 space-y-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div 
          className="p-3 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">إجمالي الأعمال</span>
            <FiFilm size={16} style={{ color: 'var(--color-accent)' }} />
          </div>
          <p className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
            {counts?.total || 0}
          </p>
        </div>

        <div 
          className="p-3 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">المستخدمون</span>
            <FiUsers size={16} style={{ color: 'var(--color-accent)' }} />
          </div>
          <p className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
            {usersCount || 0}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 text-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <p className="text-xs text-gray-500">
          &copy; 2025 <span style={{ color: 'var(--color-accent)' }}>Arab Film DB</span>
        </p>
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
  const [activeSection, setActiveSection] = useState('stats'); // القسم النشط

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
      <Sidebar 
        counts={counts} 
        usersCount={users.length} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
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
            </button>
              <button
              onClick={() => {
                navigate('/');
              }}
              className="w-58 px-1 py-2 rounded-xl font-bold transition-all duration-300 text-white hover:shadow-lg"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              الرئيسية  
            </button>          </div>

          {/* قسم الإحصائيات */}
          {activeSection === 'stats' && (
            <>
              {/* بطاقات الإحصائيات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <StatsCard title="إجمالي الأفلام" value={counts.films.toLocaleString()} icon={<FiFilm size={24} className="text-black" />} />
                <StatsCard title="إجمالي المسلسلات" value={counts.series.toLocaleString()} icon={<FiTv size={24} className="text-black" />} />
                <StatsCard title="إجمالي الأعمال" value={counts.total.toLocaleString()} icon={<FiBarChart2 size={24} className="text-black" />} />
              </div>

              {/* المؤشرات الدائرية */}
              <div 
                className="p-8 rounded-xl shadow-lg mb-8 border border-white/10"
                style={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 100%)' }}
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">توزيع المحتوى</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <CircularProgress
                    percentage={counts.total > 0 ? (counts.films / counts.total) * 100 : 0}
                    color="#f59e0b"
                    label="الأفلام"
                    value={counts.films}
                  />
                  <CircularProgress
                    percentage={counts.total > 0 ? (counts.series / counts.total) * 100 : 0}
                    color="#3b82f6"
                    label="المسلسلات"
                    value={counts.series}
                  />
                  <CircularProgress
                    percentage={100}
                    color="#10b981"
                    label="المستخدمون"
                    value={users.length}
                  />
                </div>
              </div>

              {/* الرسم البياني الشريطي */}
              <div 
                className="p-8 rounded-xl shadow-lg border border-white/10"
                style={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 100%)' }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">مقارنة الإحصائيات</h3>
                <BarChart
                  data={[
                    { 
                      label: 'الأفلام', 
                      value: counts.films, 
                      color: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' 
                    },
                    { 
                      label: 'المسلسلات', 
                      value: counts.series, 
                      color: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' 
                    },
                    { 
                      label: 'إجمالي الأعمال', 
                      value: counts.total, 
                      color: 'linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)' 
                    },
                    { 
                      label: 'المستخدمون', 
                      value: users.length, 
                      color: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' 
                    }
                  ]}
                  maxValue={Math.max(counts.total, users.length)}
                />
              </div>
            </>
          )}

          {/* قسم الأفلام */}
          {activeSection === 'movies' && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">الأفلام</h2>
                <div className="relative w-full max-w-sm">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={q}
                    onChange={(e)=>setQ(e.target.value)}
                    placeholder="ابحث بالعنوان أو السنة..."
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
                        <th className="px-4 py-3">تحكم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (
                        <tr><td colSpan="4" className="px-4 py-6 text-center text-white">جاري التحميل...</td></tr>
                      )}
                      {!loading && filtered.filter(w => w.type === 'film').length === 0 && (
                        <tr><td colSpan="4" className="px-4 py-6 text-center text-white">لا توجد أفلام</td></tr>
                      )}
                      {!loading && filtered.filter(w => w.type === 'film').map((w, idx) => (
                        <tr key={w._id} className={"border-t border-gray-700 " + (idx % 2 === 0 ? 'bg-black/5' : '')}>
                          <td className="px-4 py-3 text-white">{w.nameArabic}</td>
                          <td className="px-4 py-3 text-gray-300">{w.nameEnglish}</td>
                          <td className="px-4 py-3 text-gray-300">{w.year}</td>
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
                                        fetchWorks();
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
          )}

          {/* قسم المسلسلات */}
          {activeSection === 'series' && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">المسلسلات</h2>
                <div className="relative w-full max-w-sm">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={q}
                    onChange={(e)=>setQ(e.target.value)}
                    placeholder="ابحث بالعنوان أو السنة..."
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
                        <th className="px-4 py-3">تحكم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (
                        <tr><td colSpan="4" className="px-4 py-6 text-center text-white">جاري التحميل...</td></tr>
                      )}
                      {!loading && filtered.filter(w => w.type === 'series').length === 0 && (
                        <tr><td colSpan="4" className="px-4 py-6 text-center text-white">لا توجد مسلسلات</td></tr>
                      )}
                      {!loading && filtered.filter(w => w.type === 'series').map((w, idx) => (
                        <tr key={w._id} className={"border-t border-gray-700 " + (idx % 2 === 0 ? 'bg-black/5' : '')}>
                          <td className="px-4 py-3 text-white">{w.nameArabic}</td>
                          <td className="px-4 py-3 text-gray-300">{w.nameEnglish}</td>
                          <td className="px-4 py-3 text-gray-300">{w.year}</td>
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
                                        fetchWorks();
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
          )}

          {/* قسم المستخدمين */}
          {activeSection === 'users' && (
            <>
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
            </>
          )}

          {/* قسم البحث */}
          {activeSection === 'search' && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">البحث في كل الأعمال</h2>
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
                        <tr><td colSpan="5" className="px-4 py-6 text-center text-white">جاري التحميل...</td></tr>
                      )}
                      {!loading && filtered.length === 0 && (
                        <tr><td colSpan="5" className="px-4 py-6 text-center text-white">لا توجد أعمال</td></tr>
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
                                        fetchWorks();
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
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
