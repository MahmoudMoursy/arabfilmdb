import React from 'react';
import '../App.css'
import { FiFilm, FiTv, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';


const StatsCard = ({ title, value, icon }) => {
  return (
<div
  className="p-10 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
  style={{ backgroundColor: "var(--color-secondary)" }}
>
  <div className="flex items-center justify-between">
    <div
      className="p-3 rounded-full"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      {icon}
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-3xl font-extrabold text-white">{value}</p>
    </div>
  </div>

  
</div>

  );
};

const AddUserForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
    toast.success("تمت إضافة المستخدم بنجاح!");
    reset();
  };

  return (
    <div
      className="p-8 rounded-lg shadow-lg mt-8"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <h2 className="text-xl font-bold text-white mb-6 border-b-2 border-amber-300 pb-2">
        إضافة مستخدم جديد
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">
              اسم المستخدم
            </label>
            <input
              {...register("username", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-accent transition-colors"
              type="text"
              id="username"
              placeholder="مثال: ahmed_ali"
              style={{ backgroundColor: "var(--color-grayy)" }}
            />
          </div>

         
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              البريد الإلكتروني
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
              type="email"
              id="email"
              placeholder="مثال: user@example.com"
              style={{ backgroundColor: "var(--color-grayy)" }}
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              كلمة المرور
            </label>
            <input
              {...register("password", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
              type="password"
              id="password"
              placeholder="********"
              style={{ backgroundColor: "var(--color-grayy)" }}
            />
          </div>

         
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="role">
              الصلاحية
            </label>
            <select
              {...register("role", { required: true })}
              className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
              id="role"
              style={{ backgroundColor: "var(--color-grayy)" }}
            >
              <option value="admin">Admin</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
        </div>

       
        <button
          type="submit"
          className="text-primary font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300 mt-4 w-full md:w-auto"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          إضافة المستخدم
        </button>

        <ToastContainer
          position="top-center"
        />
      </form>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className=" text-white w-64 p-5 space-y-8 flex flex-col" style={{backgroundColor: 'var(--color-secondary)' }}>
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
          {/* <li className="mb-2">
            <a href="" className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors">
              <FiUsers className="ml-3" />
             اضافه 
            </a>
          </li> */}
        </ul>
      </nav>
      <div className="text-center text-gray-500 text-xs">
        <p>&copy; 2025 Your Movie Site</p>
      </div>
    </div>
  );
};



const AdminDashboard = () => {
  const stats = {
    movies: 1250,
    series: 850,
    users: 15,
  };

  return (
    <div className="flex h-screen " dir="rtl" style={{backgroundColor: 'var(--color-dark)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8">
          <h1 className="text-3xl font-bold text-white mb-8">نظرة عامة على الإحصائيات</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard title="إجمالي الأفلام" value={stats.movies.toLocaleString()} icon={<FiFilm size={24} className="text-accent" />} />
            <StatsCard title="إجمالي المسلسلات" value={stats.series.toLocaleString()} icon={<FiTv size={24} className="text-accent" />} />
            <StatsCard title="إجمالي المستخدمين" value={stats.users.toLocaleString()} icon={<FiUsers size={24} className="text-accent" />} />
          </div>
          <AddUserForm />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
