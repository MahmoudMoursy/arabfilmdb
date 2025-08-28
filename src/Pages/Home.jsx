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
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaStar } from "react-icons/fa";


function Home() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [dotCount, setDotCount] = useState(1);
  const navigate = useNavigate();
  const [siteRating, setSiteRating] = useState(0);
  const [siteDescription, setSiteDescription] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const handleSubmit = () => {
    if (!siteRating) return alert("اختر تقييم أولاً ⭐");
    axiosInstance
      .post("/site-reviews", { ratingValue: siteRating, description: siteDescription })
      .then(() => {
        setSiteRating(0);
        setSiteDescription("");
      });
  };
  useEffect(() => {
    axiosInstance
      .get("/site-reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

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
              navigate('/AddForm');
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
        <div >
          <LatestAdditions />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">احدث الافلام</h2>
        </div>
        <div  >
          <LastFilme />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white ">أحدث المسلسلات</h2>
        </div>
        <div >
          <LastSeries />
        </div>
      </div>
       <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 ">
          <h2 className="text-3xl font-bold text-white "> الأكثر تقييماً</h2>
        </div >
        <div >
          <MostRated />
        </div>
      </div>


      <div style={{ backgroundColor: 'var(--color-secondary)' }} >
        <div className=" p-7 pt-9 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white ">الأفلام
          </h2>
          <button
  className="flex items-center gap-3 bg-[#2b3441] px-6 py-3 rounded-full text-white"
  onClick={() => {
    navigate('/MovieFilterDemo');
  }}
>

            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${i <= dotCount ? "bg-amber-300" : "bg-[#1f2530]"
                    }`}
                />
              ))}
            </div>
            <span className="text-white font-extrabold text-2xl" >المزيد</span>

          </button>
        </div>
        <div >
          <Filme />
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--color-primary)' }} >
        <div className=" p-7 pt-9 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white ">المسلسلات
          </h2>
          <button className="flex items-center gap-3 bg-[#2b3441] px-6 py-3 rounded-full"
  onClick={() => {
    navigate('/SeriesFilterDemo');
  }}
>
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
        <div>
          <Series />
        </div>
      </div>
       <div className="py-20 flex items-center justify-center bg-amber-400">
      <div className="w-full max-w-md p-7 rounded-2xl shadow-2xl bg-[#1e1e1e]">
        <h2 className="text-2xl font-bold text-white mb-5 text-center">✨ قيّم الموقع ✨</h2>

        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((v) => (
            <Star
              key={v}
              size={36}
              className={`cursor-pointer transition-transform duration-200 ${
                (hoverRating || siteRating) >= v
                  ? "fill-yellow-500 text-yellow-500 scale-110"
                  : "text-white/40"
              }`}
              onMouseEnter={() => setHoverRating(v)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setSiteRating(v)}
            />
          ))}
        </div>

        
        <div className="flex gap-2">
          <input
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            placeholder="اكتب رأيك بالموقع..."
            className="flex-1 p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
 <div className="max-w-6xl mx-auto mt-14 px-4 relative">
      <h2 className="text-center text-3xl font-extrabold text-white mb-10">
    أراء المستخدمين ⭐
      </h2>

       <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}   
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 50},
          768: { slidesPerView: 2, spaceBetween: 50}, 
          1024: { slidesPerView: 2, spaceBetween: 50 } 
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-[#2b3441] text-white rounded-3xl p-6 shadow-lg border border-gray-600 my-10 flex flex-col justify-between items-center hover:-translate-y-2 transition-all duration-300 min-h-[180px] space-y-4">
      {/* تقييم النجوم */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 ${
              i < review.ratingValue ? "text-yellow-400" : "text-gray-500"
            }`}
            aria-label={`${review.ratingValue} out of 5 stars`}
          />
        ))}
      </div>

      {/* وصف التقييم */}
      <p className="text-center text-base text-gray-200 leading-relaxed flex-1 flex items-center line-clamp-3">
        "{review.description}"
      </p>

      {/* اسم المستخدم */}
      <span className="mt-1 font-bold text-lg text-yellow-300">
        {review.username}
      </span>
      
      {/* التاريخ */}
      <span className="text-sm text-gray-400">
        {new Date(review.updatedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      <Footer />
    </div>

  );
}

export default Home;
