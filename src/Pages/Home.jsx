import LatestAdditions from '../HomeSech/LatestAdditions.JSX';
import MostRated from '../HomeSech/MostRated'
import Filme from '../HomeSech/Filme';
import Series from '../HomeSech/Series';
import Footer from '../componet/Footer';
import Navbar from '../componet/Navbar';
import MediaSlider from '../SliderHome/MediaSlider';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import LastFilme from '../HomeSech/LastFilme';
import LastSeries from '../HomeSech/LastSeries';
import { axiosInstance } from '../api/axiosInstance';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [dotCount, setDotCount] = useState(1);
  const navigate = useNavigate();
  const [siteRating, setSiteRating] = useState(0);
  const [siteDescription, setSiteDescription] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" min-h-screen" style={{ backgroundColor: 'black' }}>
      <Navbar />
      <MediaSlider />
      {(user?.role === 'admin' || user?.role === 'publisher') ? (
      <div className="flex flex-col md:flex-row justify-between items-center px-3 py-5 space-y-4 md:space-y-0 md:space-x-6" style={{ backgroundColor: 'var(--color-primary)' }}>
          <button
            onClick={() => {
              navigate('/Dashboard');
            }}
            className="w-58 px-1 py-2 rounded-xl font-bold transition-all duration-300 text-white hover:shadow-lg"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            أضافه
          </button>
          {user?.role === 'admin' && (
          <button
            onClick={() => {
              navigate('/AdminDashboard');
            }}
            className="w-58 px-1 py-2 rounded-xl font-bold transition-all duration-300 text-white hover:shadow-lg"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            لوحة التحكم
          </button>
          )}
      </div>
        ) : null}
      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">إصدارات جديدة</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <LatestAdditions />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">احدث الافلام</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <LastFilme />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">أحدث المسلسلات</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <LastSeries />
        </div>
      </div>
       <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white "> الأكثر تقييماً</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <MostRated />
        </div>
      </div>


      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white ">الأفلام
          </h2>
          <button className="flex items-center gap-3 bg-[#2b3441] px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${i <= dotCount ? "bg-amber-300" : "bg-[#1f2530]"
                    }`}
                />
              ))}
            </div>
            <span className="text-white font-extrabold text-2xl">المزيد</span>

          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <Filme />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white ">المسلسلات
          </h2>
          <button className="flex items-center gap-3 bg-[#2b3441] px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${i <= dotCount ? "bg-amber-300" : "bg-[#1f2530]"
                    }`}
                />
              ))}
            </div>
            <span className="text-white font-extrabold text-2xl">المزيد</span>

          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <Series />
        </div>
      </div>
      <div className="p-7" style={{ backgroundColor: 'var(--color-primary)' }}>
        <h2 className="text-2xl font-bold text-white mb-3">قيّم الموقع</h2>
        <div className="flex gap-2 mb-3">
          {[1,2,3,4,5].map(v => (
            <button key={v} onClick={()=>setSiteRating(v)} className={`px-3 py-1 rounded ${siteRating>=v? 'bg-yellow-500 text-black':'bg-white/10 text-white'}`}>{v}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={siteDescription} onChange={e=>setSiteDescription(e.target.value)} placeholder="اكتب رأيك بالموقع" className="flex-1 p-2 rounded bg-[#2a2a2a] text-white" />
          <button onClick={() => axiosInstance.post('/site-reviews', { ratingValue: siteRating, description: siteDescription }).then(()=>{setSiteRating(0);setSiteDescription('');})} className="px-4 py-2 rounded bg-yellow-500 text-black">إرسال</button>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Home;
