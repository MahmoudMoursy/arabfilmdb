import Navbar from "../componet/Navbar";
import Footer from "../componet/Footer";
import React, { useEffect, useState } from "react";
import { Star, Play, User, Heart, Share2, Link, Trash2 } from "lucide-react";
import {
  fetchAverageRatings,
  fetchItemById,
  fetchMovies,
} from "../redux/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../api/axiosInstance";
import { commentService } from "../api/commentService";
import { useParams, useNavigate } from "react-router-dom";
import FavoriteButton from "../componet/FavoriteButton";
import AddToFavoritesButton from "../componet/AddToFavoritesButton";

//swiper
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const { selectedItem, loading, error } = useSelector((state) => state.movies);
  const { allMovies, ratings, ratingsLoading } = useSelector(
    (state) => state.movies
  );
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fallback to localStorage if Redux state is not available
  const user = currentUser || JSON.parse(localStorage.getItem("user"));

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
      const workIds = allMovies.map((movie) => movie._id);
      dispatch(fetchAverageRatings(workIds));
    }
  }, [allMovies, dispatch]);
  const getMovieRating = (movieId) => {
    const rating = ratings[movieId];
    if (rating && rating.average > 0) {
      return {
        average: rating.average,
        count: rating.count,
        displayText: `${rating.average.toFixed(1)} (${rating.count})`,
      };
    }
    return {
      average: 0,
      count: 0,
      displayText: "لا توجد تقييمات",
    };
  };
  console.log(selectedItem);

  // const similarMovies = allMovies.filter(
  //     (movie) => movie.genre === selectedItem?.genre ); // Get up to 5 similar movies

  // const [movie, setMovie] = useState({
  //     id: 1,
  //     rating: 4.5,
  //     isFavorite: false
  // });
  const [avgRating, setAvgRating] = useState({ average: 0, count: 0 });
  const [comments, setComments] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [userRatingLoading, setUserRatingLoading] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [movieState, setMovieState] = useState({
    id: 1,
    rating: 4.5,
    isFavorite: false,
  });

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setMovie((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    console.log("تم تغيير حالة المفضلة:", !movie.isFavorite);
  };

  // const handleShareClick = (e) => {
  //     e.stopPropagation();
  //     console.log('تم النقر على مشاركة:', movie);

  //     if (navigator.share) {
  //         navigator.share({
  //             url: window.location.href
  //         });
  //     } else {
  //         navigator.clipboard.writeText(window.location.href);
  //         alert('تم نسخ الرابط!');
  //     }
  // };

  useEffect(() => {
    if (!id || !selectedItem) return;

    console.log("Item loaded, fetching ratings and comments...");

    // Fetch average rating
    setRatingLoading(true);
    axiosInstance
      .get(`/ratings/average/${id}`)
      .then((r) => setAvgRating(r.data))
      .catch((error) => {
        console.error("Error fetching average rating:", error);
        setAvgRating({ average: 0, count: 0 });
      })
      .finally(() => setRatingLoading(false));

    // Fetch comments
    setCommentLoading(true);
    axiosInstance
      .get(`/comments/work/${id}`)
      .then((r) => setComments(r.data))
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setComments([]);
      })
      .finally(() => setCommentLoading(false));

    // Fetch user's rating if logged in
    const token = localStorage.getItem("token");
    if (token) {
      setUserRatingLoading(true);
      axiosInstance
        .get(`/ratings/user/${id}`)
        .then((r) => {
          setMyRating(r.data.ratingValue);
          setHasRated(r.data.ratingValue > 0);
        })
        .catch((error) => {
          console.error("Error fetching user rating:", error);
          setMyRating(0);
          setHasRated(false);
        })
        .finally(() => setUserRatingLoading(false));
    }
  }, [id, selectedItem]);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">جاري تحميل تفاصيل العمل...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <div className="text-center">
            <div className="text-red-400 text-lg mb-4">
              حدث خطأ في تحميل البيانات
            </div>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      </>
    );
  }

  // No item found
  if (!selectedItem) {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <div className="text-center">
            <div className="text-gray-400 text-lg mb-4">
              لم يتم العثور على العمل المطلوب
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/Details/${id}`;

    if (navigator.share) {
      navigator.share({
        title: selectedItem.nameArabic,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("تم نسخ الرابط!");
    }
  };

  const submitRating = (val) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("يجب تسجيل الدخول لتقييم هذا العمل");
      navigate("/login");
      return;
    }

    if (hasRated) {
      alert(
        "لقد قمت بتقييم هذا العمل مسبقاً بتقييم " +
          myRating +
          "/5 نجوم.\nلا يمكنك التقييم مرة أخرى أو تغيير تقييمك."
      );
      return;
    }

    setRatingLoading(true);
    console.log("Submitting rating:", { workId: id, ratingValue: val });

    axiosInstance
      .post("/ratings", { workId: id, ratingValue: val })
      .then((response) => {
        console.log("Rating submitted successfully:", response.data);
        setMyRating(val);
        setHasRated(true);
        // Refresh average rating
        return axiosInstance.get(`/ratings/average/${id}`);
      })
      .then((r) => {
        setAvgRating(r.data);
        alert(`تم تقييم العمل بنجاح! تقييمك: ${val}/5 نجوم`);
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
        alert("حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.");
      })
      .finally(() => setRatingLoading(false));
  };

  const submitComment = () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("يجب تسجيل الدخول لإضافة تعليق");
      navigate("/login");
      return;
    }

    setCommentLoading(true);
    axiosInstance
      .post("/comments", { workId: id, commentText: newComment })
      .then((r) => {
        setComments([r.data, ...comments]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
        alert("حدث خطأ أثناء إرسال التعليق. يرجى المحاولة مرة أخرى.");
      })
      .finally(() => setCommentLoading(false));
  };

  const deleteComment = async (commentId) => {
    if (!confirm("هل أنت متأكد من حذف هذا التعليق؟")) {
      return;
    }

    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("تم حذف التعليق بنجاح");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("حدث خطأ أثناء حذف التعليق");
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
          className={`lucide lucide-star fill-current text-primary transition-colors duration-200 ${
            isFilled ? "" : isHalf ? "opacity-75" : "opacity-50"
          }`}
        />
      );
    }

    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div
          className="relative h-[100vh] overflow-hidden"
          style={{ backgroundColor: "var(--color-dark)" }}
        >
          <div className="absolute inset-5">
            <img
              alt={selectedItem.nameArabic}
              className="w-full h-full object-cover blur-sm scale-100"
              src={selectedItem.posterUrl}
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="flex flex-col md:flex-row justify-between md:gap-20 max-w-full py-6 md:py-0">
              <div className="flex-shrink-0 mx-auto mt-20 md:mt-0 md:mx-0">
                <img
                  alt={selectedItem.nameArabic}
                  className="w-[170px] h-[280px] md:w-[360px] md:h-[500px] object-cover rounded-lg shadow-2xl"
                  src={selectedItem.posterUrl}
                />
              </div>
              <div className="flex-1 text-white pt-10 md:my-0">
                <h1 className="text-3xl md:text-6xl font-bold mb-2">
                  {selectedItem.nameArabic}
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 mb-4">
                  {selectedItem.nameEnglish}
                </p>

                {/* Rating Section */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => submitRating(star)}
                          disabled={
                            ratingLoading || userRatingLoading || hasRated
                          }
                          className={`transition-colors ${
                            ratingLoading || userRatingLoading || hasRated
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer hover:scale-110"
                          }`}
                          title={
                            hasRated
                              ? `لقد قيّمت هذا العمل مسبقاً`
                              : `قيّم العمل بـ ${star}/5 نجوم`
                          }
                        >
                          <Star
                            size={24}
                            className={`transition-colors ${
                              hasRated && myRating >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : avgRating.average >= star
                                ? "fill-yellow-400/50 text-yellow-400/50"
                                : "fill-transparent text-gray-300"
                            }`}
                          />
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

                {/* Movie Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-normal text-xl">
                      {selectedItem.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedItem.type === "film" ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="font-normal text-xl">
                          {selectedItem.duration || "مدة غير محددة"}
                        </span>
                      </>
                    ) : selectedItem.type === "series" ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="2"
                            y="7"
                            width="20"
                            height="15"
                            rx="2"
                            ry="2"
                          />
                          <polyline points="17 2 12 7 7 2" />
                        </svg>
                        <span className="font-normal text-xl">
                          {selectedItem.seasonsCount &&
                          selectedItem.episodesCount
                            ? `${selectedItem.seasonsCount} مواسم - ${selectedItem.episodesCount} حلقة`
                            : selectedItem.seasonsCount
                            ? `${selectedItem.seasonsCount} مواسم`
                            : selectedItem.episodesCount
                            ? `${selectedItem.episodesCount} حلقة`
                            : "مسلسل - متعدد الحلقات"}
                        </span>
                      </>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                    <span className="font-normal text-xl">
                      {selectedItem.country}
                    </span>
                  </div>
                  {/* {selectedItem.type === "series" && (<div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                            <polyline points="17 2 12 7 7 2" />
                                        </svg>
                                        <span className="font-normal text-xl">
                                            عدد المواسم: {selectedItem.seasonsCount || 0}
                                        </span>
                                    </div>)} */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 10.5V7c0-1.1-.9-2-2-2H3C1.9 5 1 5.9 1 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" />
                    </svg>
                    <span className="font-normal text-xl">
                      {selectedItem.genre}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed">
                  {selectedItem.summary}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => submitRating(5)}
                    disabled={ratingLoading || userRatingLoading || hasRated}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      hasRated
                        ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                        : "bg-white/20 text-white hover:bg-white/30"
                    } ${
                      ratingLoading || userRatingLoading || hasRated
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Star size={20} />
                    {hasRated ? `تم التقييم مسبقاً` : `قيّم الفيلم (5)`}
                  </button>

                  <div className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-white/20 text-white hover:bg-white/30">
                    <FavoriteButton
                      workId={id}
                      size={20}
                      className="!w-auto !h-auto !bg-transparent !hover:bg-transparent"
                    />
                    <span>أضف للمفضلة</span>
                  </div>

                  <button
                    onClick={handleShareClick}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Share2 size={20} />
                    مشاركة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div
          className="px-20 py-12"
          style={{ backgroundColor: "var(--color-black)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 text-white">
              {/* Movie Details Card */}
              <div
                className="bg-card shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(to right, #1f1f1f, #2c2c2c)",
                }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                  🎬 تفاصيل الفيلم
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1">🎥 المخرج</h3>
                    <p className="text-gray-300">
                      {selectedItem.director || "غير محدد"}
                    </p>
                  </div>

                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1">
                      📅 تاريخ الإصدار
                    </h3>
                    <p className="text-gray-300">
                      {selectedItem.createdAt
                        ? new Date(selectedItem.createdAt).toLocaleDateString(
                            "ar-EG"
                          )
                        : "غير محدد"}
                    </p>
                  </div>

                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1">
                      🎥 مساعد المخرج
                    </h3>
                    <p className="text-gray-300">
                      {selectedItem.assistantDirector || "غير محدد"}
                    </p>
                  </div>

                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1">
                      🎭 التصنيف
                    </h3>
                    <p className="text-gray-300">{selectedItem.genre}</p>
                  </div>

                  {selectedItem.type === "series" && (
                    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-white mb-1">
                        📺 معلومات المسلسل
                      </h3>
                      <div className="space-y-1">
                        {selectedItem.seasonsCount && (
                          <p className="text-gray-300">
                            عدد المواسم: {selectedItem.seasonsCount}
                          </p>
                        )}
                        {selectedItem.episodesCount && (
                          <p className="text-gray-300">
                            عدد الحلقات: {selectedItem.episodesCount}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                      🎬 الأبطال
                    </h3>
                    <div className="flex flex-col gap-2">
                      {selectedItem.cast && selectedItem.cast.length > 0 ? (
                        selectedItem.cast.map((actor, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <User size={18} className="text-white" />
                            <span>{actor}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">لم يتم تحديد الممثلين</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                      📍 مكان التصوير
                    </h3>
                    <p className="text-gray-300">
                      {selectedItem.filmingLocation || "غير محدد"}
                    </p>
                  </div>
                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                      📅 السنة
                    </h3>
                    <p className="text-gray-300">
                      {selectedItem.year || "غير محدد"}
                    </p>
                  </div>
                  <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                      🎭 النوع{" "}
                    </h3>
                    <p className="text-gray-300">
                      {selectedItem.genre || "غير محدد"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    ⭐ التقييمات والآراء
                  </h2>
                </div>

                <div className="text-center py-10 bg-[#1f1f1f] rounded-xl shadow-md">
                  <div className="px-4">
                    <div className="text-gray-300 text-lg font-medium mb-4">
                      {ratingLoading ? (
                        <div className="animate-pulse bg-gray-600 h-6 w-48 rounded mx-auto"></div>
                      ) : (
                        `متوسط التقييم: ${avgRating.average.toFixed(1)} (${
                          avgRating.count
                        } تقييم)`
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
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => submitRating(v)}
                          disabled={
                            ratingLoading || userRatingLoading || hasRated
                          }
                          title={
                            hasRated
                              ? `لقد قيّمت هذا العمل مسبقاً`
                              : `قيّم العمل بـ ${v}/5 نجوم`
                          }
                          className={`p-2 rounded transition-all duration-200 ${
                            myRating >= v
                              ? "bg-yellow-500 text-black"
                              : "bg-white/10 text-white"
                          } ${
                            ratingLoading || userRatingLoading || hasRated
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-white/20"
                          }`}
                        >
                          <Star
                            size={20}
                            className={
                              myRating >= v
                                ? "fill-current text-black"
                                : "text-white"
                            }
                          />
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="أضف تعليقك"
                        className="flex-1 p-2 rounded bg-[#2a2a2a] text-white"
                        disabled={commentLoading}
                      />
                      <button
                        onClick={submitComment}
                        disabled={commentLoading || !newComment.trim()}
                        className={`px-4 py-2 rounded transition-all duration-200 ${
                          commentLoading || !newComment.trim()
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-yellow-500 text-black hover:bg-yellow-600"
                        }`}
                      >
                        {commentLoading ? "جاري الإرسال..." : "إرسال"}
                      </button>
                    </div>

                    <div className="text-right mt-6 space-y-3">
                      {commentLoading ? (
                        <div className="animate-pulse space-y-3">
                          {Array(3)
                            .fill("⭐")
                            .map((star, i) => (
                              <div
                                key={i}
                                className="p-3 bg-[#2a2a2a] rounded flex items-center gap-2"
                              >
                                <span className="text-yellow-400 text-lg">
                                  {star}
                                </span>
                                <div className="animate-pulse bg-gray-600 h-4 w-full rounded"></div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        comments.map((c) => (
                          <div
                            key={c._id}
                            className="p-3 bg-[#2a2a2a] rounded text-white text-right relative"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">{c.commentText}</div>
                              {user?.role === "admin" && (
                                <button
                                  onClick={() => deleteComment(c._id)}
                                  className="mr-2 p-2 text-red-500 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-400/50"
                                  title="حذف التعليق"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Sidebar */}
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
                  {/* <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            <Heart className="w-5 h-5" />
                                            المفضلة</span>
                                        <span className="font-semibold text-white">
                                            {selectedItem.Favorite}
                                        </span>
                                    </div> */}
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
                  {/* <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">🎭 النوع</span>
                                        <span className="font-semibold text-white">{selectedItem.genre || 'غير محدد'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 flex items-center gap-2">📅 السنة</span>
                                        <span className="font-semibold text-white">{selectedItem.year || 'غير محدد'}</span>
                                    </div> */}

                  {selectedItem.type === "series" &&
                    selectedItem.seasonsCount && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center gap-2">
                          📺 المواسم
                        </span>
                        <span className="font-semibold text-white">
                          {selectedItem.seasonsCount}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border mt-18 border-gray-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-4xl mx-4 font-bold text-white mb-6 flex items-center gap-2">
              🎞️ أفلام مشابهة
            </h3>

            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {allMovies
                .filter(
                  (movie) =>
                    movie.genre == selectedItem?.genre &&
                    movie.type == selectedItem?.type
                )
                .map((movie, index) => {
                  if (movie._id === selectedItem?._id) return null; // تخطي الفيلم الحالي
                  const movieRating = getMovieRating(movie._id);

                  return (
                    <SwiperSlide key={index} style={{ paddingBottom: `60px` }}>
                      <div
                        key={index}
                        className="group card-hover bg-card border text-3xl border-white/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-amber-300/100 hover:-translate-y-5 text-white w-[160px] md:w-[310px] z-10"
                        style={{ backgroundColor: "var(--color-dark)" }}
                      >
                        <div className="block cursor-pointer" role="button">
                          <div className="relative aspect-[2/3] overflow-hidden">
                            {!isImageLoaded && !imageError && (
                              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                              </div>
                            )}
                            <img
                              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                                isImageLoaded ? "opacity-100" : "opacity-0"
                              }`}
                              loading="lazy"
                              src={movie?.posterUrl}
                              onLoad={() => setIsImageLoaded(true)}
                              onError={(e) => {
                                setImageError(true);
                                e.target.src =
                                  "https://via.placeholder.com/300x450/1f2937/9ca3af?text=صورة+غير+متوفرة";
                              }}
                            />

                            <div className="absolute top-2 right-2 bg-amber-300 backdrop-blur-sm rounded-lg px-2 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                              <span className="text-primary-foreground text-xs font-medium">
                                {movie?.genre}
                              </span>
                            </div>

                            <div className="absolute top-2 right-18 bg-amber-400 backdrop-blur-sm rounded-lg px-2 text-black font-extrabold py-1 transition-all duration-300 group-hover:bg-amber-400">
                              <span className="text-primary-foreground text-xs font-medium">
                                {movie?.type}
                              </span>
                            </div>

                            {/* Overlay buttons */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
                                <Link
                                  to={`/Details/${movie._id}`}
                                  className="bg-transparent"
                                >
                                  <button className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                    <Play size={30} className="fill-current" />
                                  </button>
                                </Link>

                                <button
                                  onClick={handleFavoriteClick}
                                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    movieState.isFavorite
                                      ? "bg-red-500/90 hover:bg-red-500 text-white focus:ring-red-500"
                                      : "bg-white/20 hover:bg-white/30 text-amber-300 focus:ring-amber-300"
                                  }`}
                                >
                                  <Heart
                                    size={30}
                                    className={
                                      movieState.isFavorite
                                        ? "fill-current"
                                        : ""
                                    }
                                  />
                                </button>

                                <button
                                  onClick={handleShareClick}
                                  className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 text-blue-700 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                                >
                                  <Share2 size={30} />
                                </button>
                              </div>
                            </div>

                            {/* Rating display */}
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
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;
