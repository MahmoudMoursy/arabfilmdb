import { axiosInstance } from './axiosInstance';

export const favoritesService = {
  // Add a work to es
  addToes: async (workId) => {
    try {
      const response = await axiosInstance.post('/users/favorites', { workId });
      console.log('addToes response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addToes:', error);
      throw error;
    }
  },

  // Remove a work from es
  removeFromes: async (workId) => {
    try {
      const response = await axiosInstance.delete(`/users/favorites/${workId}`);
      console.log('removeFromes response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in removeFromes:', error);
      throw error;
    }
  },

  // Get user's es list
  getes: async () => {
    try {
      const response = await axiosInstance.get('/users/favorites');
      console.log('getes response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getes:', error);
      throw error;
    }
  },

  // Check if a work is in es
  checkeStatus: async (workId) => {
    const response = await axiosInstance.get(`/users/favorites/check/${workId}`);
    return response.data;
  },

  // Toggle e status (add if not ed, remove if ed)
  togglee: async (workId, currentStatus) => {
    if (currentStatus) {
      return await esService.removeFromes(workId);
    } else {
      return await esService.addToes(workId);
    }
  },

  // Add to es and redirect to profile
  addToesAndRedirect: async (workId, navigate, workData = null, toast = null) => {
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

      // Check if already in es
      const statusResponse = await esService.checkeStatus(workId);
      if (statusResponse.ise) {
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

      // Add to es
      const response = await esService.addToes(workId);
      console.log('Added to es and redirecting:', response);

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
      console.error('Error in addToesAndRedirect:', error);
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
