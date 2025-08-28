import Navbar from '../componet/Navbar';
import Footer from '../componet/Footer';
import React, { useEffect, useState } from 'react';
import {  Star, Play, Heart,User, Link ,Share2 } from 'lucide-react';
import { fetchAverageRatings, fetchItemById, fetchMovies } from '../redux/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../api/axiosInstance';
import { useParams ,useNavigate} from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';




const Details = () => {

    const { id } = useParams();
    const { selectedItem ,loading} = useSelector((state) => state.movies);
    const { allMovies, ratings, ratingsLoading } = useSelector(state => state.movies);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    console.log(selectedItem);
    
    useEffect(() => {
        if (id) {
            dispatch(fetchItemById(id));
        }
    }, [dispatch, id]);
    
    
    useEffect(() => {
        dispatch(fetchMovies());
      }, [dispatch]);
    
     useEffect(() => {
        if (allMovies.length > 0) {
          const workIds = allMovies.map(movie => movie._id);
          dispatch(fetchAverageRatings(workIds));
        }
    }, [allMovies, dispatch]);
    
    console.log(allMovies);
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
    console.log(selectedItem);
    
    const similarMovies = allMovies.filter(
        (movie) => movie.genre === selectedItem?.genre ); // Get up to 5 similar movies
    console.log(similarMovies);


    const [movie, setMovie] = useState({
        id: 1,
        rating: 4.5,
        isFavorite: false
    });
    const [avgRating, setAvgRating] = useState({ average: 0, count: 0 });
    const [comments, setComments] = useState([]);
    const [myRating, setMyRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [ratingLoading, setRatingLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [userRatingLoading, setUserRatingLoading] = useState(false);
    const [hasRated, setHasRated] = useState(false);

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);


     const [movieState, setMovieState] = useState({
        id: 1,
        rating: 4.5,
        isFavorite: false
      });

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

    useEffect(() => {
        if (!id) return;

        // Simple server health check
        console.log('🔍 Checking server health...');
        axiosInstance.get('/ratings/average/' + id)
            .then(() => console.log('✅ Server is responding'))
            .catch((error) => {
                console.error('❌ Server health check failed:', error);
                if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
                    console.error('❌ Network error - server might be down');
                }
            });

        // Fetch average rating
        setRatingLoading(true);
        axiosInstance.get(`/ratings/average/${id}`)
            .then((r) => setAvgRating(r.data))
            .catch((error) => {
                console.error('Error fetching average rating:', error);
                setAvgRating({ average: 0, count: 0 });
            })
            .finally(() => setRatingLoading(false));

        // Fetch comments
        setCommentLoading(true);
        axiosInstance.get(`/comments/work/${id}`)
            .then((r) => setComments(r.data))
            .catch((error) => {
                console.error('Error fetching comments:', error);
                setComments([]);
            })
            .finally(() => setCommentLoading(false));

        // Fetch user's rating if logged in
        const token = localStorage.getItem('token');
        if (token) {
            setUserRatingLoading(true);
            axiosInstance.get(`/ratings/user/${id}`)
                .then((r) => {
                    setMyRating(r.data.ratingValue);
                    setHasRated(r.data.ratingValue > 0);
                })
                .catch((error) => {
                    console.error('Error fetching user rating:', error);
                    setMyRating(0);
                    setHasRated(false);
                })
                .finally(() => setUserRatingLoading(false));
        }
    }, [id]);

    const submitRating = (val) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('يجب تسجيل الدخول لتقييم هذا العمل');
            navigate('/login');
            return;
        }

        if (hasRated) {
            alert('لقد قمت بتقييم هذا العمل مسبقاً بتقييم ' + myRating + '/5 نجوم.\nلا يمكنك التقييم مرة أخرى أو تغيير تقييمك.');
            return;
        }

        setRatingLoading(true);
        console.log('Submitting rating:', { workId: id, ratingValue: val });

        axiosInstance.post('/ratings', { workId: id, ratingValue: val })
            .then((response) => {
                console.log('Rating submitted successfully:', response.data);
                setMyRating(val);
                setHasRated(true);
                // Refresh average rating
                return axiosInstance.get(`/ratings/average/${id}`);
            })
            .then((r) => {
                setAvgRating(r.data);
                // رسالة نجاح التقييم الأول
                alert(`تم تقييم العمل بنجاح! تقييمك: ${val}/5 نجوم`);
            })
            .catch((error) => {
                console.error('Error submitting rating:', error);
                console.error('Error details:', error.response?.data);
                alert('حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.');
            })
            .finally(() => setRatingLoading(false));
    };



    const submitComment = () => {
        if (!newComment.trim()) return;

        const token = localStorage.getItem('token');
        if (!token) {
            alert('يجب تسجيل الدخول لإضافة تعليق');
            navigate('/login');
            return;
        }

        setCommentLoading(true);
        axiosInstance.post('/comments', { workId: id, commentText: newComment })
            .then((r) => {
                setComments([r.data, ...comments]);
                setNewComment('');
            })
            .catch((error) => {
                console.error('Error submitting comment:', error);
                alert('حدث خطأ أثناء إرسال التعليق. يرجى المحاولة مرة أخرى.');
            })
            .finally(() => setCommentLoading(false));
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
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-300"></div>
                        </div>
                    )}
                    <div className="absolute inset-5">
                        <img
                            alt="صغيرة على الحب"
                            className="w-full h-full object-cover blur-sm scale-100"
                            src={selectedItem?.posterUrl}
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </div>
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        <div className="flex flex-col md:flex-row justify-between md:gap-20 max-w-full py-6 md:py-0">

                            <div className="flex-shrink-0 mx-auto mt-20 md:mt-0 md:mx-0 ">
                                <img
                                    alt="صغيرة على الحب"
                                    className="w-[170px] h-[280px] md:w-[360px] md:h-[500px] object-cover rounded-lg shadow-2xl"
                                    src={selectedItem?.posterUrl}
                                />
                            </div>
                            <div className="flex-1 text-white pt-10 md:my-0">
                                <h1 className="text-3xl md:text-6xl font-bold mb-2"> {selectedItem?.nameArabic} </h1>
                                <p className="text-lg md:text-2xl text-gray-300 mb-4">{selectedItem?.nameEnglish}</p>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center gap-1 ">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => submitRating(star)}
                                                    disabled={ratingLoading || userRatingLoading || hasRated}
                                                    className={`transition-colors ${(ratingLoading || userRatingLoading || hasRated) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}`}
                                                    title={hasRated ? `لقد قيّمت هذا العمل مسبقاً` : `قيّم العمل بـ ${star}/5 نجوم`}
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
                                                        className={`lucide lucide-star transition-colors ${hasRated && myRating >= star
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : avgRating.average >= star
                                                                    ? 'fill-yellow-400/50 text-yellow-400/50'
                                                                    : 'fill-transparent text-gray-300'
                                                            }`}
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                    </svg>
                                                </button>
                                            ))}



                                        </div>
                                        <span className="text-sm text-muted-foreground mr-1">
                                            {ratingLoading ? (
                                                <div className="animate-pulse bg-gray-600 h-4 w-8 rounded"></div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span>{`(${avgRating.average.toFixed(1)})`}</span>
                                                    {hasRated && (
                                                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                                            قيّمت
                                                        </span>
                                                    )}
                                                </div>
                                            )}
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
                                        <span className='font-normal text-xl '>{selectedItem?.year}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {selectedItem?.type === 'film' ? (
                                            <>
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
                                                <span className="font-normal text-xl">
                                                    {selectedItem?.duration || 'مدة غير محددة'} {/* مثل: 120 دقيقة */}
                                                </span>
                                            </>
                                        ) : selectedItem?.type === 'series' ? (
                                            <>
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
                                                    className="lucide lucide-tv"
                                                    aria-hidden="true"
                                                >
                                                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                                    <polyline points="17 2 12 7 7 2" />
                                                </svg>
                                                <span className="font-normal text-xl">
                                                    {selectedItem?.episodesCount
                                                        ? `عدد الحلقات: ${selectedItem.episodesCount}`
                                                        : 'مسلسل - متعدد الحلقات'}
                                                </span>
                                            </>
                                        ) : null}
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
                                        <span className='font-normal text-xl '>{selectedItem?.country}</span>
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
                                            {selectedItem?.genre}
                                        </span>
                                    </div>

                                </div>
                                <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed">
                                    {selectedItem?.summary}
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => submitRating(5)}
                                        disabled={ratingLoading || userRatingLoading || hasRated}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${hasRated
                                                ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                                                : 'bg-white/20 text-white hover:bg-white/30'
                                            } ${(ratingLoading || userRatingLoading || hasRated) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
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
                                        {hasRated ? `تم التقييم مسبقاً` : `قيّم الفيلم (5)`}
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
                                        <p className="text-gray-300">{selectedItem?.director} </p>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">📅 تاريخ الإصدار</h3>
                                        <p className="text-gray-300">{selectedItem?.createdAt}</p>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">🎥 مساعد المخرج</h3>
                                        <p className="text-gray-300"> {selectedItem?.assistantDirector}</p>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1">🎭 التصنيف</h3>
                                        <p className="text-gray-300">{selectedItem?.genre}</p>
                                    </div>
                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                            🎬 الأبطال
                                        </h3>
                                        <div className="flex flex-col gap-2">
                                            {selectedItem?.cast.map((actor, index) => (
                                                <div key={index} className="flex items-center gap-2 text-gray-300">
                                                    <User size={18} className="text-white" />
                                                    <span>{actor}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                                            📍 مكان التصوير
                                        </h3>
                                        <p className="text-gray-300">{selectedItem?.filmingLocation}</p>
                                    </div>
                                </div>


                            </div>
                            <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border border-gray-700 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        ⭐ التقييمات والآراء
                                    </h2>

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
                                    <div className="px-4">
                                        <div className="text-gray-300 text-lg font-medium mb-4">
                                            {ratingLoading ? (
                                                <div className="animate-pulse bg-gray-600 h-6 w-48 rounded mx-auto"></div>
                                            ) : (
                                                `متوسط التقييم: ${avgRating.average.toFixed(1)} (${avgRating.count} تقييم)`
                                            )}
                                        </div>

                                        {/* User Rating Status */}
                                        {userRatingLoading ? (
                                            <div className="text-center mb-4">
                                                <div className="animate-pulse bg-gray-600 h-4 w-32 rounded mx-auto mb-2"></div>
                                            </div>
                                        ) : hasRated ? (
                                            <div className="text-center mb-4">
                                                <div className="text-yellow-400 font-semibold mb-2">
                                                    تقييمك: {myRating}/5 ⭐
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    لا يمكنك تغيير تقييمك بعد التقييم
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center mb-4">
                                                <div className="text-white font-semibold mb-2">
                                                    قيّم هذا العمل
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    اختر من 1 إلى 5 نجوم
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-center gap-2 mb-6">
                                            {[1, 2, 3, 4, 5].map(v => (
                                                <button
                                                    key={v}
                                                    onClick={() => submitRating(v)}
                                                    disabled={ratingLoading || userRatingLoading || hasRated}
                                                    title={hasRated ? `لقد قيّمت هذا العمل مسبقاً` : `قيّم العمل بـ ${v}/5 نجوم`}
                                                    className={`px-3 py-1 rounded transition-all duration-200 ${myRating >= v
                                                            ? 'bg-yellow-500 text-black'
                                                            : 'bg-white/10 text-white'
                                                        } ${(ratingLoading || userRatingLoading || hasRated) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
                                                >
                                                    {v}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                value={newComment}
                                                onChange={e => setNewComment(e.target.value)}
                                                placeholder="أضف تعليقك"
                                                className="flex-1 p-2 rounded bg-[#2a2a2a] text-white"
                                                disabled={commentLoading}
                                            />
                                            <button
                                                onClick={submitComment}
                                                disabled={commentLoading || !newComment.trim()}
                                                className={`px-4 py-2 rounded transition-all duration-200 ${commentLoading || !newComment.trim()
                                                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                                        : 'bg-yellow-500 text-black hover:bg-yellow-600'
                                                    }`}
                                            >
                                                {commentLoading ? 'جاري الإرسال...' : 'إرسال'}
                                            </button>
                                        </div>
                                        <div className="text-right mt-6 space-y-3">
                                            {commentLoading ? (
                                                <div className="animate-pulse space-y-3">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="p-3 bg-[#2a2a2a] rounded">
                                                            <div className="animate-pulse bg-gray-600 h-4 w-full rounded"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                comments.map(c => (
                                                    <div key={c._id} className="p-3 bg-[#2a2a2a] rounded text-white text-right">
                                                        {c.commentText}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
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
                                        {ratingLoading ? (
                                            <div className="animate-pulse bg-gray-600 h-4 w-16 rounded"></div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-yellow-400">
                                                    {avgRating.average.toFixed(1)} / 5
                                                </span>
                                                {hasRated && (
                                                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                                        قيّمت
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                              <Heart className="w-5 h-5" />
                                            المفضلة
                                        </span>
                                        <span className="font-semibold text-white">
                                            {selectedItem?.favoriteCount || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            📝 عدد التقييمات
                                        </span>
                                        {ratingLoading ? (
                                            <div className="animate-pulse bg-gray-600 h-4 w-8 rounded"></div>
                                        ) : (
                                            <span className="font-semibold text-white">
                                                {avgRating.count}
                                            </span>
                                        )}
                                    </div>
                                    {hasRated && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 flex items-center gap-2">
                                                ⭐ تقييمك
                                            </span>
                                            <span className="font-semibold text-yellow-400">
                                                {myRating} / 5
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            💬 عدد التعليقات
                                        </span>
                                        {commentLoading ? (
                                            <div className="animate-pulse bg-gray-600 h-4 w-8 rounded"></div>
                                        ) : (
                                            <span className="font-semibold text-white">
                                                {comments.length}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            🎭 النوع
                                        </span>
                                        <span className="font-semibold text-white">
                                            {selectedItem?.genre || 'غير محدد'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            📅 السنة
                                        </span>
                                        <span className="font-semibold text-white">
                                            {selectedItem?.year || 'غير محدد'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <button

                                        className="w-full py-2 px-4 bg-amber-300 text-white rounded-lg hover:bg-primary-dark transition">
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
                            {console.log(selectedItem)}
                            {allMovies.filter(movie =>  movie.genre==selectedItem?.genre && movie.type == selectedItem?.type
                        ).map((movie, index) => {
                                {if (movie._id === selectedItem?._id) return null;} // تخطي الفيلم الحالي
            const movieRating = getMovieRating(movie._id);
            return (
            <SwiperSlide key={index}>
              <div
                className="group card-hover bg-card border text-3xl border-white/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-amber-300/100 hover:-translate-y-5 text-white w-[160px] md:w-[300px] z-10"
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

                    <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm rounded-lg px-2 py-1 animate-pulse">
                      <span className="text-white text-xs font-bold">جديد</span>
                    </div>

                    <div className="absolute top-2 right-2 bg-amber-300 backdrop-blur-sm rounded-lg px-2 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                      <span className="text-primary-foreground text-xs font-medium">{movie?.genre}</span>
                    </div>
                    <div className="absolute top-2 right-18 bg-amber-400 backdrop-blur-sm rounded-lg px-2 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                      <span className="text-primary-foreground text-xs font-medium">{movie?.type}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
                        <Link
                              key={index}
                              to={`/Details/${movie._id}`}  
                              className="bg-transparent"
                            >
                              <button className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                <Play size={30} className="fill-current" />
                              </button>
                            </Link>


                        <button
                          onClick={handleFavoriteClick}
                          className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${movieState.isFavorite ? 'bg-red-500/90 hover:bg-red-500 text-white focus:ring-red-500' : 'bg-white/20 hover:bg-white/30 text-amber-300 focus:ring-amber-300'}`}
                        >
                          <Heart size={30} className={movieState.isFavorite ? 'fill-current' : ''} />
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
            </SwiperSlide   >
          )}
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Details;