import Navbar from '../componet/Navbar';
import Footer from '../componet/Footer';
import React, { useState } from 'react';
import {  Star, Play, Heart,User } from 'lucide-react';
const actors = ["أحمد خالد", "سارة محمد", "علي حسن"];
const Details = () => {
    const similarMovies = [
  {
    id: 1,
    title: "صيد العقارب",
    subtitle: "Scorpion Hunt",
    image: "https://wyfkyzwy.manus.space/assets/tv1.jpg",
    genre: "دراما",
    rating: 4.2,
    isFavorite: false
  },

];
    const [movie, setMovie] = useState({
        id: 1,
        rating: 4.5,
        isFavorite: false
    });

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);



    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setMovie(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
        console.log('تم تغيير حالة المفضلة:', !movie.isFavorite);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        console.log('تم النقر على مشاركة:', movie);


        if (navigator.share) {
            navigator.share({
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('تم نسخ الرابط!');
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            const isFilled = i < fullStars;
            const isHalf = i === fullStars && hasHalfStar;

            stars.push(
                <Star
                    key={i}
                    size={14}
                    className={`lucide lucide-star fill-current text-primary transition-colors duration-200 ${isFilled ? '' : isHalf ? 'opacity-75' : 'opacity-50'
                        }`}
                />
            );
        }

        return stars;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen " >
                <div className="relative h-[100vh] overflow-hidden" style={{ backgroundColor: 'var(--color-dark)' }}>
                    <div className="absolute inset-5">
                        <img
                            alt="صغيرة على الحب"
                            className="w-full h-full object-cover blur-sm scale-100"
                            src="https://media0084.elcinema.com/uploads/_640x_424c592c731316dcaf1b3581e530cb30dc7f88044eeb769cd3c97b3f0b5c19f8.jpg"
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </div>
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        <div className="flex flex-col md:flex-row justify-between md:gap-20 max-w-full py-6 md:py-0">

                            <div className="flex-shrink-0 mx-auto mt-20 md:mt-0 md:mx-0 ">
                                <img
                                    alt="صغيرة على الحب"
                                    className="w-[170px] h-[280px] md:w-[360px] md:h-[500px] object-cover rounded-lg shadow-2xl"
                                    src="https://media0084.elcinema.com/uploads/_640x_424c592c731316dcaf1b3581e530cb30dc7f88044eeb769cd3c97b3f0b5c19f8.jpg"
                                />
                            </div>
                            <div className="flex-1 text-white pt-10 md:my-0">
                                <h1 className="text-3xl md:text-6xl font-bold mb-2">صغيرة على الحب</h1>
                                <p className="text-lg md:text-2xl text-gray-300 mb-4">Too Young to Love</p>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center gap-1 ">
                                        <div className="flex items-center gap-0.5">
                                            <button
                                                type="button"
                                                className="transition-colors cursor-default"
                                                disabled=""
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-star fill-yellow-400 text-yellow-400 transition-colors"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="transition-colors cursor-default"
                                                disabled=""
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-star fill-yellow-400 text-yellow-400 transition-colors"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="transition-colors cursor-default"
                                                disabled=""
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-star fill-yellow-400 text-yellow-400 transition-colors"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="transition-colors cursor-default"
                                                disabled=""
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-star fill-yellow-400 text-yellow-400 transition-colors"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="transition-colors cursor-default"
                                                disabled=""
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-star fill-transparent text-gray-300 dark:text-gray-600 transition-colors"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="text-sm text-muted-foreground mr-1">
                                            (4.2)
                                        </span>
                                    </div>

                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-calendar "
                                            aria-hidden="true"
                                        >
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <rect width={18} height={18} x={3} y={4} rx={2} />
                                            <path d="M3 10h18" />
                                        </svg>
                                        <span className='font-normal text-xl '>2023</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-clock"
                                            aria-hidden="true"
                                        >
                                            <circle cx={12} cy={12} r={10} />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span className='font-normal text-xl '>120 دقيقة</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-map-pin"
                                            aria-hidden="true"
                                        >
                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                            <circle cx={12} cy={10} r={3} />
                                        </svg>
                                        <span className='font-normal text-xl '>مصر</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-map-pin"
                                            aria-hidden="true"
                                        >
                                            <path d="M17 10.5V7c0-1.1-.9-2-2-2H3C1.9 5 1 5.9 1 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" />
                                        </svg>
                                        <span className="font-normal text-xl">
                                            دراما
                                        </span>
                                    </div>

                                </div>
                                <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed">
                                    قصة حب مؤثرة تحكي عن فتاة صغيرة تواجه تحديات الحياة والحب في سن
                                    مبكرة.
                                </p>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-white/20 text-white hover:bg-white/30">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-star"
                                            aria-hidden="true"
                                        >
                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </svg>
                                        قيّم الفيلم
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-white/20 text-white hover:bg-white/30">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-heart"
                                            aria-hidden="true"
                                        >
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                        </svg>
                                        أضف للمفضلة
                                    </button>
                                    <button onClick={handleShareClick} className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-share2 lucide-share-2"
                                            aria-hidden="true"
                                        >
                                            <circle cx={18} cy={5} r={3} />
                                            <circle cx={6} cy={12} r={3} />
                                            <circle cx={18} cy={19} r={3} />
                                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                                        </svg>
                                        مشاركة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" px-20 py-12" style={{ backgroundColor: 'var(--color-black)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8 text-white">
                            <div
                                className="bg-card shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
                                style={{ background: 'linear-gradient(to right, #1f1f1f, #2c2c2c)' }}
                            >
                                <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                                    🎬 تفاصيل الفيلم
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">🎥 المخرج</h3>
                                        <p className="text-gray-300">أحمد خالد</p>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">📅 تاريخ الإصدار</h3>
                                        <p className="text-gray-300">2023-01-01</p>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">🎥 مساعد المخرج</h3>
                                        <p className="text-gray-300">أحمد خالد</p>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">🎭 التصنيف</h3>
                                        <p className="text-gray-300">دراما</p>
                                    </div>
                                      <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                   <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                           🎬 الأبطال
                     </h3>
                          <div className="flex flex-col gap-2">
                      {actors.map((actor, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                             <User size={18} className="text-wh" />
                           <span>{actor}</span>
                        </div>
                                 ))}
                    </div>
                                  </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                                            📍 مكان التصوير
                                        </h3>
                                        <p className="text-gray-300">القاهرة، الإسكندرية، أسوان</p>
                                    </div>
                                </div>


                            </div>
                            <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border border-gray-700 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        ⭐ التقييمات والآراء
                                    </h2>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={18}
                                            height={18}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-star"
                                            aria-hidden="true"
                                        >
                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </svg>
                                        أضف تقييمك
                                    </button>
                                </div>

                                <div className="text-center py-10 bg-[#1f1f1f] rounded-xl shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={48}
                                        height={48}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-message-square text-yellow-400 mx-auto mb-4 animate-bounce"
                                        aria-hidden="true"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <p className="text-gray-300 text-lg font-medium">
                                        لا توجد تقييمات بعد. <span className="text-yellow-400 font-semibold">كن أول من يقيم هذا الفيلم</span> وشارك رأيك مع الآخرين!
                                    </p>
                                    <button className="mt-6 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition duration-200">
                                        ✍️ أضف تقييمك الآن
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border border-gray-700 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
                                    📊 إحصائيات سريعة
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            ⭐ التقييم
                                        </span>
                                        <span className="font-semibold text-yellow-400">4.2 / 5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            👁️‍🗨️ المشاهدات
                                        </span>
                                        <span className="font-semibold text-white">15,420</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            📝 عدد التقييمات
                                        </span>
                                        <span className="font-semibold text-white">0</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <button className="w-full py-2 px-4 bg-amber-300 text-white rounded-lg hover:bg-primary-dark transition">
                                        تعديل
                                    </button>
                                    <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                        حذف
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border mt-18 border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-4xl mx-4 font-bold text-white mb-6 flex items-center gap-2">
                            🎞️ أفلام مشابهة
                        </h3>

                        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {similarMovies.map((movie, index) => (
                                <div
                                    key={index}
                                    className="group card-hover bg-card border text-3xl border-white/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-amber-300/100 hover:-translate-y-2 text-white"
                                    style={{ backgroundColor: 'var(--color-dark)' }}
                                >
                                    <div className="block cursor-pointer" role="button" aria-label={`مشاهدة الفيلم ${movie.title}`}>
                                        <div className="relative aspect-[2/3] overflow-hidden">
                                            {!isImageLoaded && !imageError && (
                                                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                                                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <img
                                                alt={movie.title}
                                                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                                loading="lazy"
                                                src={movie.image}
                                                onLoad={() => setIsImageLoaded(true)}
                                                onError={(e) => {
                                                    setImageError(true);
                                                    e.target.src = 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=صورة+غير+متوفرة';
                                                }}
                                            />

                                            <div className="absolute top-2 right-2 bg-amber-300 backdrop-blur-sm rounded-lg px-4 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                                                <span className="text-primary-foreground text-base font-bold">{movie.genre}</span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
                                                    <button className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110">
                                                        <Play size={30} className="fill-current" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleFavoriteClick(movie.id)}
                                                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${movie.isFavorite
                                                                ? 'bg-red-500/90 hover:bg-red-500 text-white'
                                                                : 'bg-white/20 hover:bg-white/30 text-amber-300'
                                                            }`}
                                                    >
                                                        <Heart size={30} className={movie.isFavorite ? 'fill-current' : ''} />
                                                    </button>
                                                   
                                                </div>
                                            </div>

                                            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 group-hover:bg-primary/90">
                                                <div className="flex items-center space-x-1 space-x-reverse">
                                                    <Star size={12} className="lucide lucide-star fill-current text-primary group-hover:text-primary-foreground" />
                                                    <span className="text-white text-xs font-medium group-hover:text-primary-foreground">
                                                        {movie.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 space-y-3">
                                            <h3 className="font-bold text-foreground text-xl line-clamp-2 group-hover:text-primary">
                                                {movie.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mt-1 ltr group-hover:text-muted-foreground/80">
                                                {movie.subtitle}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-amber-300 space-x-1 space-x-reverse">
                                                    {renderStars(movie.rating)}
                                                    <span className="text-xs text-white">({movie.rating})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

<Footer/>
        </>
    );
};

export default Details;