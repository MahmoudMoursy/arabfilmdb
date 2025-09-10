import React, { useState, useEffect } from 'react';
import { Star, Play, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchAverageRatings } from '../redux/moviesSlice';
import AddToFavoritesButton from '../componet/AddToFavoritesButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MostRated = () => {
  const { allMovies, ratings, ratingsLoading } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (allMovies.length > 0) {
      const workIds = allMovies.map(movie => movie._id);
      dispatch(fetchAverageRatings(workIds));
    }
  }, [allMovies, dispatch]);

  const [imageStates, setImageStates] = useState({});


  const handleShareClick = (e, movie) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/Details/${movie._id}`;
    
    if (navigator.share) {
      navigator.share({
        title: movie.nameArabic,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
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
          className={`fill-current transition-colors duration-200 ${
            isFilled ? 'text-yellow-400' : isHalf ? 'text-yellow-400 opacity-75' : 'text-gray-400'
          }`}
        />
      );
    }
    return stars;
  };

  const getTopRatedMovies = () => {
    const moviesWithRatings = allMovies.map(movie => {
      const rating = ratings[movie._id];
      return {
        ...movie,
        averageRating: rating ? rating.average : 0,
        ratingCount: rating ? rating.count : 0
      };
    });

    return moviesWithRatings
      .filter(movie => movie.averageRating > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);
  };

  const topRatedMovies = getTopRatedMovies();

  // If no top rated movies, show placeholder
  if (topRatedMovies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-white mb-2">لا توجد أفلام مقيمة حالياً</h3>
          <p className="text-gray-400">سيتم عرض الأفلام الأكثر تقييماً هنا عند توفرها</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background p-8 w-full" dir="rtl">
      <Swiper
        style={{ width: "100%", height: "100%" }}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 5 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 20 }
        }}
      >
        {topRatedMovies.map((movie, index) => (
          <SwiperSlide
            key={movie._id} style={{paddingBottom:`60px`}}
            className="group card-hover bg-card border text-3xl border-white/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-amber-300/100 hover:-translate-y-5 text-white w-[160px] md:w-[280px] z-10"
          >
            <div
              className="block cursor-pointer"
              role="button"
              aria-label={`مشاهدة الفيلم ${movie.nameArabic}`}
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                {!imageStates[movie._id]?.loaded && !imageStates[movie._id]?.error && (
                  <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-amber-300/20 border-t-amber-300 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  alt={movie.nameArabic}
                  className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                    imageStates[movie._id]?.loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  src={movie.posterUrl}
                  onLoad={() => setImageStates(prev => ({ ...prev, [movie._id]: { loaded: true, error: false } }))}
                  onError={(e) => {
                    setImageStates(prev => ({ ...prev, [movie._id]: { loaded: false, error: true } }));
                    e.target.src = 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=صورة+غير+متوفرة';
                  }}
                />

                <div className="absolute top-2 right-2 bg-amber-300 backdrop-blur-sm rounded-lg px-3 text-black font-bold py-1 transition-all duration-300 group-hover:bg-amber-400">
                  <span className="text-sm font-bold">
                    {movie.genre}
                  </span>
                </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                  <Link to={`/Details/${movie._id}`}>
                    <button className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                      <Play size={24} className="fill-current" />
                    </button>
                  </Link>

                  <AddToFavoritesButton workId={movie._id} />

                  <button
                    onClick={(e) => handleShareClick(e, movie)}
                    className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

                {/* Rating display */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 transition-all duration-300 group-hover:bg-amber-500/90">
                  <div className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="fill-current text-yellow-400 group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                    <span className="text-white text-xs font-medium group-hover:text-white transition-colors duration-300">
                      {movie.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Rank badge */}
                <div className="absolute top-2 left-2 bg-yellow-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-black text-xs font-bold">
                    #{index + 1}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-amber-300 transition-colors duration-300">
                    {movie.nameArabic}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1 transition-colors duration-300 group-hover:text-gray-200">
                    {movie.nameEnglish}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-300 gap-1">
                    {ratingsLoading ? (
                      <div className="animate-pulse bg-gray-600 h-4 w-16 rounded"></div>
                    ) : (
                      <>
                        {renderStars(movie.averageRating)}
                        <span className="text-xs text-white transition-colors duration-300 mr-2">
                          ({movie.averageRating.toFixed(1)} - {movie.ratingCount})
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MostRated;
