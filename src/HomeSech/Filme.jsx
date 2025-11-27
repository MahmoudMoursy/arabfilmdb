import React, { useMemo, useState } from 'react';
import { Eye, Calendar, Star, Play, Share2, Clock, Globe } from 'lucide-react';
import { useGetWorksQuery, useGetRatingsForWorksQuery } from '../redux/apiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import AddToFavoritesButton from '../componet/AddToFavoritesButton';


const Filme = () => {
  const { data: works = [], isLoading: worksLoading } = useGetWorksQuery();

  const films = useMemo(() => (works ? works.filter(item => item.type === 'film') : []), [works]);
  const workIds = useMemo(() => (films && films.length ? films.map(f => f._id) : []), [films]);
  const { data: ratings = {}, isLoading: ratingsLoading } = useGetRatingsForWorksQuery(workIds, {
    skip: workIds.length === 0,
  });

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
          className={`lucide lucide-star fill-current text-primary transition-colors duration-200 ${isFilled ? '' : isHalf ? 'opacity-75' : 'opacity-50'}`}
        />
      );
    }

    return stars;
  };

  // Get rating for a specific movie
  const getMovieRating = (movieId) => {
    const rating = ratings[movieId];
    if (rating && rating.average > 0) {
      return {
        average: rating.average,
        count: rating.count,
        displayText: `${rating.average.toFixed(1)} (${rating.count})`
      };
    }
    return {
      average: 0,
      count: 0,
      displayText: 'لا توجد تقييمات'
    };
  };

  return (
    <div className="bg-background p-8" dir="rtl">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}   // مسافة أصغر
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 1 }, // موبايل
          768: { slidesPerView: 3, spaceBetween: 1 }, // تابلت
          1024: { slidesPerView: 5, spaceBetween: 1 } // ديسكتوب
        }}
      >
        {films.slice(-5).map((movie, index) => {
          const movieRating = getMovieRating(movie._id);
          return (
          <SwiperSlide key={index} style={{paddingBottom:`60px`}}>

            <div
              key={index}
              className="group card-hover bg-card border text-3xl border-white/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-amber-300/100 hover:-translate-y-5 text-white w-[160px] md:w-[310px] z-10"
              style={{ backgroundColor: 'var(--color-dark)' }}
            >
              <div className="block cursor-pointer" role="button">
                <div className="relative aspect-[2/3] overflow-hidden">
                  {!isImageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    src={movie?.posterUrl}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => {
                      setImageError(true);
                      e.target.src = 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=صورة+غير+متوفرة';
                    }}
                  />

                  <div className="absolute top-2 right-2 bg-amber-300 backdrop-blur-sm rounded-lg px-2 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                    <span className="text-primary-foreground text-xs font-medium">{movie?.genre}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
                      <Link to={`/Details/${movie._id}`}>
                        <button className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                          <Play size={30} className="fill-current" />
                        </button>
                      </Link>

                      <AddToFavoritesButton workId={movie._id} />

                      <button
                        onClick={handleShareClick}
                        className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-blue-700 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      >
                        <Share2 size={30} />
                      </button>
                    </div>
                  </div>

                  {/* Rating display on poster */}
                  {movieRating.average > 0 && (
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 transition-all duration-300 group-hover:bg-primary/90">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star
                          size={12}
                          className="lucide lucide-star fill-current text-yellow-400 group-hover:text-primary-foreground transition-colors duration-300"
                          aria-hidden="true"
                        />
                        <span className="text-white text-xs font-medium group-hover:text-primary-foreground transition-colors duration-300">
                          {movieRating.average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-foreground text-2xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {movie?.nameArabic}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 ltr transition-colors duration-300 group-hover:text-muted-foreground/80">
                      {movie?.nameEnglish}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-300 space-x-1 space-x-reverse">
                      {ratingsLoading ? (
                        <div className="animate-pulse bg-gray-600 h-4 w-16 rounded"></div>
                      ) : movieRating.average > 0 ? (
                        <>
                          {renderStars(movieRating.average)}
                          <span className="text text-xs mr-2 text-white transition-colors duration-300">
                            ({movieRating.displayText})
                          </span>
                        </>
                      ) : (
                        <span className="text text-xs mr-2 text-gray-400 transition-colors duration-300">
                          {movieRating.displayText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )})}
      </Swiper>
    </div>
  );
};

export default Filme;