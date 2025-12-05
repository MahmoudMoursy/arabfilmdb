import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import advertisementsService from '../api/advertisementsService';

const AdvertisementSlider = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchActiveAdvertisements();
    }, []);

    const fetchActiveAdvertisements = async () => {
        try {
            setLoading(true);
            const data = await advertisementsService.getActiveAdvertisements();
            // Handle different response formats
            if (Array.isArray(data)) {
                setAdvertisements(data);
            } else if (data && Array.isArray(data.data)) {
                setAdvertisements(data.data);
            } else if (data && Array.isArray(data.advertisements)) {
                setAdvertisements(data.advertisements);
            } else {
                console.error('Unexpected advertisements format:', data);
                setAdvertisements([]);
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching advertisements:', err);
            setAdvertisements([]);
            setError('فشل في تحميل الإعلانات');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[400px] bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
            </div>
        );
    }

    if (error || !advertisements || advertisements.length === 0) {
        return null; // Don't show anything if there are no active advertisements
    }

    const getMediaUrl = (mediaPath) => {
        if (!mediaPath) return null;

        if (typeof mediaPath === "string") {
            return mediaPath.startsWith("http")
                ? mediaPath
                : `https://api.arabfilmdb.com${mediaPath}`;
        }

        if (Array.isArray(mediaPath) && mediaPath.length > 0) {
            const firstMedia = mediaPath[0];
            return firstMedia.startsWith("http")
                ? firstMedia
                : `https://api.arabfilmdb.com${firstMedia}`;
        }

        if (typeof mediaPath === "object") {
            const url = mediaPath.url || mediaPath.path || mediaPath.src;
            if (url) {
                return url.startsWith("http")
                    ? url
                    : `https://api.arabfilmdb.com${url}`;
            }
        }

        return null;
    };

    return (
        <div className="w-full bg-black">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={advertisements.length > 1}
                className="advertisement-slider"
            >
                {advertisements.map((ad) => (
                    <SwiperSlide key={ad._id || ad.id}>
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                            {ad.mediaType === 'image' ? (
                                <img
                                    src={getMediaUrl(ad.media)}
                                    alt={ad.name || 'إعلان'}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : ad.mediaType === 'video' ? (
                                <video
                                    src={getMediaUrl(ad.media)}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : null}

                            {/* Overlay gradient for better text visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                            {/* Advertisement title if available */}
                            {ad.name && (
                                <div className="absolute bottom-8 left-8 right-8 z-10">
                                    <h3 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                                        {ad.name}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AdvertisementSlider;
