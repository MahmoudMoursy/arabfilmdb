import LatestAdditions from '../HomeSech/LatestAdditions.JSX';
import MostViewed from '../HomeSech/MostViewed'
import MostRated from '../HomeSech/MostRated'
import Filme from '../HomeSech/Filme';
import Series from '../HomeSech/Series';
import Footer from '../componet/Footer';
import Navbar from '../componet/Navbar';
import MediaSlider from '../SliderHome/MediaSlider';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';
function Home() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const dropdownRef1 = useRef();
  const dropdownRef2 = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setOpen1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setOpen2(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className=" min-h-screen" style={{ backgroundColor: 'black' }}>
      <Navbar />
      <MediaSlider />
      <div className="flex flex-col md:flex-row justify-between items-center px-3 py-5 space-y-4 md:space-y-0 md:space-x-6" style={{ backgroundColor: 'var(--color-primary)' }}>
     
          <button
            onClick={() => {
              navigate('/AddForm');
            }}
            className="w-58 px-1 py-2 rounded-xl font-bold transition-all duration-300 text-white hover:shadow-lg"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            أضافه
          </button>
      </div>
      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">أحدث الإضافات</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <LatestAdditions />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">الأكثر مشاهدة
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <MostViewed />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white "> الأكثر تقييماً</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <MostRated />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white ">أفلام
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
      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white ">مسلسلات
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
      <Footer />
    </div>

  );
}

export default Home;
