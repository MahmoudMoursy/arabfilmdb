import React, { useState, useEffect } from 'react';
import { Star, Play, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchAverageRatings } from '../redux/moviesSlice';

const MostRated = () => {
  const { allMovies, ratings, ratingsLoading } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Fetch ratings when movies are loaded
  useEffect(() => {
    if (allMovies.length > 0) {
      const workIds = allMovies.map(movie => movie._id);
      dispatch(fetchAverageRatings(workIds));
    }
  }, [allMovies, dispatch]);

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

  // Get top rated movies
  const getTopRatedMovies = () => {
    const moviesWithRatings = allMovies.map(movie => {
      const rating = ratings[movie._id];
      return {
        ...movie,
        averageRating: rating ? rating.average : 0,
        ratingCount: rating ? rating.count : 0
      };
    });

    // Sort by average rating (descending) and filter out movies with no ratings
    return moviesWithRatings
      .filter(movie => movie.averageRating > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5); // Get top 5
  };

  const topRatedMovies = getTopRatedMovies();

  return (
    <div className="bg-background p-8 flex items-center justify-center" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl">
        {topRatedMovies.map((movie, index) => (
          <div key={movie._id} className="group card-hover bg-card border text-3xl border-white/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-amber-300/100 hover:-translate-y-10 text-white" style={{ backgroundColor: 'var(--color-dark)' }}>
            <div
              className="block cursor-pointer"
              role="button"
              aria-label={`مشاهدة الفيلم ${movie.nameArabic}`}
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                {!isImageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  alt={movie.nameArabic}
                  className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  src={movie.posterUrl}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={(e) => {
                    setImageError(true);
                    e.target.src = 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=صورة+غير+متوفرة';
                  }}
                />

                <div className="absolute top-2 right-2 bg-amber-300 backdrop-blur-sm rounded-lg px-3 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                  <span className="text-primary-foreground text-base font-bold">{movie.genre}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
                    <Link to={`/Details/${movie._id}`}>
                      <button className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                        <Play size={30} className="fill-current" />
                      </button>
                    </Link>

                    <button
                      onClick={handleFavoriteClick}
                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${movie.isFavorite ? 'bg-red-500/90 hover:bg-red-500 text-white focus:ring-red-500' : 'bg-white/20 hover:bg-white/30 text-amber-300 focus:ring-amber-300'}`}
                    >
                      <Heart size={30} className={movie.isFavorite ? 'fill-current' : ''} />
                    </button>

                    <button
                      onClick={handleShareClick}
                      className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-blue-700 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    >
                      <Share2 size={30} />
                    </button>
                  </div>
                </div>

                {/* Rating display on poster */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 transition-all duration-300 group-hover:bg-primary/90">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star
                      size={12}
                      className="lucide lucide-star fill-current text-yellow-400 group-hover:text-primary-foreground transition-colors duration-300"
                      aria-hidden="true"
                    />
                    <span className="text-white text-xs font-medium group-hover:text-primary-foreground transition-colors duration-300">
                      {movie.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Rank badge */}
                <div className="absolute top-2 left-2 bg-yellow-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-black text-xs font-bold">#{index + 1}</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-foreground text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {movie.nameArabic}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 ltr transition-colors duration-300 group-hover:text-muted-foreground/80">
                    {movie.nameEnglish}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-300 space-x-1 space-x-reverse">
                    {ratingsLoading ? (
                      <div className="animate-pulse bg-gray-600 h-4 w-16 rounded"></div>
                    ) : (
                      <>
                        {renderStars(movie.averageRating)}
                        <span className="text text-xs mr-2 text-white transition-colors duration-300">
                          ({movie.averageRating.toFixed(1)} - {movie.ratingCount})
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRated;
