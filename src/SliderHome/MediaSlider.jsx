import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestMovies, fetchLatestSeries } from '../redux/moviesSlice';
import './MediaSlider.css';

const MediaSlider = () => {
  const dispatch = useDispatch();
  const { latestMovies, latestSeries, latestMoviesLoading, latestSeriesLoading } = useSelector(state => state.movies);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Combine latest 2 movies and 2 series
  const sliderData = useMemo(() => {
    const movies = latestMovies.slice(0, 2).map(movie => ({
      id: movie._id,
      title: movie.nameArabic,
      description: movie.summary || 'لا يوجد وصف متاح',
      imageUrl: movie.posterUrl,
      type: 'movie',
      year: movie.year,
      duration: movie.duration || 'غير محدد',
      rating: movie.rating || 0,
      genre: movie.genre || 'غير محدد',
      newRelease: true
    }));

    const series = latestSeries.slice(0, 2).map(serie => ({
      id: serie._id,
      title: serie.nameArabic,
      description: serie.summary || 'لا يوجد وصف متاح',
      imageUrl: serie.posterUrl,
      type: 'series',
      year: serie.year,
      seasons: serie.seasons || 1,
      rating: serie.rating || 0,
      genre: serie.genre || 'غير محدد',
      newRelease: true
    }));

    return [...movies, ...series];
  }, [latestMovies, latestSeries]);

  useEffect(() => {
    dispatch(fetchLatestMovies());
    dispatch(fetchLatestSeries());
  }, [dispatch]);

  useEffect(() => {
    if (isAutoPlaying && sliderData.length > 0) {
      const interval = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % sliderData.length);
      }, 6000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlaying, sliderData.length]);

  const handleSlideChange = (newSlideOrFunction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newSlide = typeof newSlideOrFunction === 'function'
      ? newSlideOrFunction(currentSlide)
      : newSlideOrFunction;

    setCurrentSlide(newSlide);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      handleSlideChange(index);
    }
  };

  const isLoading = latestMoviesLoading || latestSeriesLoading;

  if (isLoading || sliderData.length === 0) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="w-16 h-16 border-4 border-amber-300/20 border-t-amber-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentItem = sliderData[currentSlide];

  return (
    <div className="media-slider-transition-all relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" style={{ fontFamily: "'Cairo', 'Amiri', 'Noto Sans Arabic', Arial, sans-serif" }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={currentItem.imageUrl}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />

        {/* Animation overlay */}
        <div
          className={`absolute inset-0 transition-transform transition-opacity duration-700 ${isTransitioning ? 'opacity-70 scale-110' : 'opacity-100 scale-100'
            } bg-black/20`}
        ></div>
      </div>


      {/* Dynamic Gradient Overlay */}
      <div className={`absolute inset-0 transition-all duration-1000 ${currentItem.type === 'movie'
        ? 'bg-gradient-to-r from-yellow-900/80 via-black/60 to-orange-900/70'
        : 'bg-gradient-to-r from-blue-900/80 via-black/60 to-purple-900/70'
        }`} />

      {/* Animated Particles Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full min-h-screen px-4 sm:px-8 lg:px-16 py-8">

        {/* Left Navigation Arrow */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="media-slider-button group p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed order-3 lg:order-1 mt-8 lg:mt-0"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content Area */}
        <div className="flex-1 max-w-5xl mx-4 lg:mx-8 text-center order-1 lg:order-2">
          {/* Type Badge with Animation */}
          <div className="mb-4 lg:mb-6">
            <span className={`inline-block px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-base font-bold transform transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
              } ${currentItem.type === 'movie'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              }`}>
              {currentItem.type === 'movie' ? 'فيلم جديد' : 'مسلسل جديد'}
              {currentItem.newRelease && (
                <span className="ml-2 inline-block w-2 h-2 mx-4 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </span>
          </div>

          {/* Title with Enhanced Typography */}
          <div className="overflow-hidden">
            <h1
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-4 lg:mb-6 drop-shadow-2xl leading-tight"
            >
              <span
                className={`bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
              >
                {currentItem.title}
              </span>
            </h1>
          </div>


          {/* Enhanced Metadata */}
          <div className={`flex flex-wrap items-center justify-center gap-4 lg:gap-6 mb-4 lg:mb-6 text-white/90 transform transition-all duration-500 delay-200 ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            <span className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-yellow-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm lg:text-base font-medium mt-1">{currentItem.year}</span>
            </span>

            <span className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <svg className="w-4 h-1 lg:w-5 lg:h-5  text-blue-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm lg:text-base font-medium mt-1">
                {currentItem.type === 'movie' ? currentItem.duration : `${currentItem.seasons} مواسم`}
              </span>
            </span>

            <span className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(currentItem.rating) ? 'text-yellow-400 ' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm lg:text-base font-medium">({currentItem.rating.toFixed(1)})</span>
            </span>

            <span className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-sm lg:text-base font-medium text-green-400">{currentItem.genre}</span>
            </span>
          </div>

          {/* Enhanced Description */}
          <p className={`text-lg lg:text-xl xl:text-2xl text-white/90 mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed font-light transform transition-all duration-500 delay-300 line-clamp-3 ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            {currentItem.description}
          </p>

          {/* Enhanced Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transform transition-all duration-500 delay-400 ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            <button className="media-slider-button group relative overflow-hidden bg-amber-300 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center">
                مشاهدة التفاصيل
                <svg
                  className="w-8 h-6 text-black group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>

            <button className="media-slider-button group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center">
                إضافة للمفضلة
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="media-slider-button group p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed order-2 lg:order-3 mt-8 lg:mt-0"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        {sliderData.map((item, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`media-slider-button relative transition-all duration-300 disabled:cursor-not-allowed ${index === currentSlide
              ? 'w-8 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full scale-125'
              : 'w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full hover:scale-110'
              }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}

        {/* Progress Bar */}
        <div className="ml-4 w-16 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / sliderData.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Enhanced Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="media-slider-button absolute top-6 lg:top-8 right-6 lg:right-8 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 group"
      >
        <div className="relative">
          {isAutoPlaying ? (
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4m-6 0a2 2 0 012-2h2a2 2 0 012 2m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v4" />
            </svg>
          )}
          {isAutoPlaying && (
            <div className="absolute -inset-1 border-2 border-yellow-400 rounded-full animate-spin opacity-50"></div>
          )}
        </div>
      </button>

      {/* Media Type Indicator */}
      <div className="absolute top-6 lg:top-8 left-6 lg:left-8 flex items-center space-x-2 space-x-reverse bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
        <span className={`w-2 h-2 rounded-full ${currentItem.type === 'movie' ? 'bg-yellow-400' : 'bg-blue-400'
          }`}></span>
        <span className="text-white text-sm font-medium">
          {currentItem.type === 'movie' ? 'فيلم' : 'مسلسل'}
        </span>
        <span className="text-white/70 text-xs">
          {currentSlide + 1} / {sliderData.length}
        </span>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="absolute bottom-20 lg:bottom-24 right-6 lg:right-8 text-white/50 text-xs hidden lg:block">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span>استخدم الأسهم للتنقل</span>
          <div className="flex space-x-1">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSlider;
