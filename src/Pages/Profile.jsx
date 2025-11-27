
import React, { useState, useEffect } from 'react';
import { PlusCircle, Heart, Star, Play, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { favoritesService } from '../api/favoritesService';
import MediaCard from '../componet/MediaCard';

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user')) || {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
    };

    const [favorites, setFavorites] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        loadUserData();
        
        // Check URL parameters for success message
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('added') === 'true') {
            setShowSuccessMessage(true);
            // Clear the URL parameter
            navigate('/profile', { replace: true });
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        }
    }, [location.search]);

    // Listen for navigation events to refresh data
    useEffect(() => {
        const handleFocus = () => {
            // Refresh data when user returns to the page
            loadUserData();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const loadUserData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Load favorites
            console.log('Loading favorites...');
            const favoritesResponse = await favoritesService.getes();
            console.log('Favorites response:', favoritesResponse);
            
            if (favoritesResponse && favoritesResponse.favorites) {
                setFavorites(favoritesResponse.favorites);
                console.log('Favorites loaded:', favoritesResponse.favorites.length);
            } else {
                setFavorites([]);
                console.log('No favorites found or invalid response');
            }
            
            // For now, we'll use a mock rating since we don't have a ratings API yet
            // TODO: Replace with actual ratings API when available
            setRatings([
                {
                    _id: '1',
                    nameArabic: 'صيد العقارب',
                    nameEnglish: 'Scorpion Hunt',
                    type: 'film',
                    rating: 4.5,
                    posterUrl: 'https://wyfkyzwy.manus.space/assets/tv1.jpg',
                    genre: 'دراما'
                }
            ]);
        } catch (err) {
            console.error('Error loading user data:', err);
            setError('حدث خطأ في تحميل البيانات');
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteChange = (workId, newStatus, response) => {
        console.log('Favorite status changed:', { workId, newStatus, response });
        
        // Update local state when favorite status changes
        if (newStatus) {
            // Work was added to favorites - we need to add it to the list
            // This would typically be handled by refetching the favorites list
            console.log('Work added to favorites, reloading data...');
            loadUserData();
        } else {
            // Work was removed from favorites - remove it from the list
            console.log('Work removed from favorites, updating local state...');
            setFavorites(prev => prev.filter(work => work._id !== workId));
        }
    };

    const handleRemoveFromFavorites = async (workId) => {
        try {
            await favoritesService.removeFromFavorites(workId);
            setFavorites(prev => prev.filter(work => work._id !== workId));
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <button 
                        onClick={loadUserData}
                        className="px-6 py-3 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
            {/* User Header Section */}
            <div className="flex flex-col items-center py-6" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <img 
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" 
                    alt="User Avatar" 
                    className="rounded-full w-32 h-32 mb-4 border-4" 
                    style={{ borderColor: 'var(--color-accent)' }} 
                />
                <h2 className="text-xl font-bold">{user.username || user.name}</h2>
                <p className="text-sm text-gray-300">{user.email}</p>
                {(user.role === 'admin' || user.role === 'publisher') && (
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black hover:opacity-90 shadow transition-all duration-300"
                        style={{ backgroundColor: "var(--color-accent)" }}
                    >
                        <PlusCircle className="w-5 h-5" />
                        لوحة التحكم
                    </button>
                )}
            </div>

            <div className="p-6 space-y-8">
                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-green-300 font-medium">
                                تم إضافة العمل إلى المفضلة بنجاح! 🎉
                            </p>
                        </div>
                    </div>
                )}
                
                {/* Ratings Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                        🎬 تم تقييمه ({ratings.length})
                    </h3>
                    {ratings.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {ratings.map((work) => (
                                <MediaCard 
                                    key={work._id} 
                                    work={work} 
                                    showFavoriteButton={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Star className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">لم تقم بتقييم أي عمل فني بعد</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="mt-4 px-6 py-3 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors"
                            >
                                تصفح الأعمال الفنية
                            </button>
                        </div>
                    )}
                </div>

                {/* Favorites Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-accent)' }}>
                            📺 المفضلة ({favorites.length})
                        </h3>
                        <button 
                            onClick={loadUserData}
                            className="px-4 py-2 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors text-sm"
                        >
                            تحديث
                        </button>
                    </div>
                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {favorites.map((work) => (
                                <div key={work._id} className="relative group">
                                    <MediaCard 
                                        work={work} 
                                        onFavoriteChange={handleFavoriteChange}
                                    />
                                    <button
                                        onClick={() => handleRemoveFromFavorites(work._id)}
                                        className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                        title="إزالة من المفضلة"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Heart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">قائمة المفضلة فارغة</p>
                            <p className="text-gray-500 text-sm mb-4">اضغط على أيقونة القلب لإضافة أعمالك المفضلة</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors"
                            >
                                تصفح الأعمال الفنية
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;