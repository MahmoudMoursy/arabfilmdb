import { axiosInstance } from './axiosInstance';

export const favoritesService = {
  // Add a work to favorites
  addToFavorites: async (workId) => {
    try {
      const response = await axiosInstance.post('/users/favorites', { workId });
      console.log('addToFavorites response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addToFavorites:', error);
      throw error;
    }
  },

  // Remove a work from favorites
  removeFromFavorites: async (workId) => {
    try {
      const response = await axiosInstance.delete(`/users/favorites/${workId}`);
      console.log('removeFromFavorites response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in removeFromFavorites:', error);
      throw error;
    }
  },

  // Get user's favorites list
  getFavorites: async () => {
    try {
      const response = await axiosInstance.get('/users/favorites');
      console.log('getFavorites response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getFavorites:', error);
      throw error;
    }
  },

  // Check if a work is in favorites
  checkFavoriteStatus: async (workId) => {
    const response = await axiosInstance.get(`/users/favorites/check/${workId}`);
    return response.data;
  },

  // Toggle favorite status (add if not favorited, remove if favorited)
  toggleFavorite: async (workId, currentStatus) => {
    if (currentStatus) {
      return await favoritesService.removeFromFavorites(workId);
    } else {
      return await favoritesService.addToFavorites(workId);
    }
  },

  // Add to favorites and redirect to profile
  addToFavoritesAndRedirect: async (workId, navigate, workData = null, toast = null) => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        if (toast) {
          toast.error('يجب تسجيل الدخول لإضافة إلى المفضلة', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          alert('يجب تسجيل الدخول لإضافة إلى المفضلة');
        }
        navigate('/login');
        return false;
      }

      // Check if already in favorites
      const statusResponse = await favoritesService.checkFavoriteStatus(workId);
      if (statusResponse.isFavorite) {
        if (toast) {
          toast.info('هذا العمل موجود بالفعل في المفضلة', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          alert('هذا العمل موجود بالفعل في المفضلة');
        }
        navigate('/profile?added=true');
        return true;
      }

      // Add to favorites
      const response = await favoritesService.addToFavorites(workId);
      console.log('Added to favorites and redirecting:', response);
      
      // Show success message with toast
      if (toast) {
        toast.success('تم الإضافة إلى المفضلة بنجاح! 🎉', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        alert('تم الإضافة إلى المفضلة بنجاح!');
      }
      
      // Redirect to profile with success parameter
      navigate('/profile?added=true&workId=' + workId);
      return true;
    } catch (error) {
      console.error('Error in addToFavoritesAndRedirect:', error);
      if (toast) {
        toast.error('حدث خطأ أثناء الإضافة إلى المفضلة', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        alert('حدث خطأ أثناء الإضافة إلى المفضلة');
      }
      return false;
    }
  }
};
