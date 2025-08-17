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
      <div className="flex flex-col md:flex-row justify-between items-center px-3 space-y-4 md:space-y-0 md:space-x-6" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="flex flex-col md:flex-row items-center gap-4 text-white px-4 py-6 md:py-10" style={{ backgroundColor: 'var(--color-primary)' }}>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full bg-white/5 text-white font-bold px-10 py-4 rounded-full hover:bg-yellow-300 hover:text-black transition"          >
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white mx-4 hover:text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5M12 2.25c2.485 2.27 3.75 5.77 3.75 9.75s-1.265 7.48-3.75 9.75c-2.485-2.27-3.75-5.77-3.75-9.75S9.515 4.52 12 2.25z" />
              </svg>
              البلد
              <svg
                className={`ml-2 w-5 h-6 transition-transform mx-4 ${open ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-50  bg-white/9 rounded-md shadow-lg z-50 border ">
                <ul className=" text-sm text-white">
                  <li href="#" className="block px-4 py-2 hover:bg-yellow-300 hover:text-black text-md text-right transition">
                    مصر
                  </li>

                </ul>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef1}>
            <button
              onClick={() => setOpen1(!open1)}
              className="flex items-center justify-between w-full bg-white/5 text-white font-bold px-13 py-4 rounded-full hover:bg-yellow-300 hover:text-black transition"          >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white mx-4 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4zM4 8h16M8 4v16" />
              </svg>

              النوع
              <svg
                className={`ml-2 w-5 h-6 transition-transform mx-4 ${open1 ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open1 && (
              <div className="absolute right-0 mt-2 w-56  bg-white/9 rounded-md shadow-lg z-50 border ">
                <ul className=" text-sm text-white">
                  <li href="#" className="block px-4 py-2 hover:bg-yellow-300 hover:text-black text-md text-right transition">
                    أكشن
                  </li>

                </ul>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef2}>
            <button
              onClick={() => setOpen2(!open2)}
              className="flex items-center justify-between w-full bg-white/5 text-white font-bold px-13 py-4 rounded-full hover:bg-amber-300 hover:text-black transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white mx-4 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 4h12M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>

              السنة
              <svg
                className={`ml-2 w-5 h-6 transition-transform mx-4 ${open2 ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open2 && (
              <div className="absolute right-0 mt-2 w-58  bg-white/9 rounded-md shadow-lg z-50 border ">
                <ul className=" text-sm text-white">
                  <li href="#" className="block px-4 py-2 hover:bg-yellow-300 hover:text-black text-md text-right transition">
                    2021
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
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
