import { axiosInstance } from './axiosInstance';

export const workService = {
  createWork: async (workData, skipMapping = false) => {
    if (!workData || typeof workData !== 'object') {
      throw new Error('Invalid work data');
    }

    // If skipMapping is true, use the workData directly (already mapped in AddForm.jsx)
    let requestData;
    
    if (skipMapping) {
      requestData = workData;
    } else {
      // Convert form data to match backend schema
      requestData = {
        type: workData.type == 'film' ? 'film' : 'series',        nameArabic: workData.nameArabic || '',
        nameEnglish: workData.nameEnglish || '',
        year: parseInt(workData.year) || 0,
        director: workData.director || '',
        assistantDirector: workData.assistantDirector || '',
        genre: workData.genre || '',
        cast: Array.isArray(workData.cast) ? workData.cast.filter(actor => actor && actor.trim() !== '') : [],
        country: workData.country || '',
        filmingLocation: workData.filmingLocation || '',
        summary: workData.summary || '',
        posterUrl: workData.posterUrl || undefined,
      };

      // Add series-specific fields if type is series
      if (workData.type === 'مسلسل') {
        requestData.seasonsCount = parseInt(workData.seasons);
        requestData.episodesCount = parseInt(workData.episodes);
      }
    }

    // Fix common issues without validation
    
    // Ensure default values for required fields
    requestData.nameArabic = requestData.nameArabic || 'عمل جديد';
    requestData.nameEnglish = requestData.nameEnglish || 'New Work';
    requestData.year = requestData.year || 2000;
    requestData.director = requestData.director || 'غير محدد';
    requestData.assistantDirector = requestData.assistantDirector || 'غير محدد';
    requestData.genre = requestData.genre || 'دراما';
    requestData.country = requestData.country || 'مصر';
    requestData.filmingLocation = requestData.filmingLocation || 'القاهرة';
    requestData.summary = requestData.summary || 'لا يوجد ملخص متاح';
    requestData.posterUrl = requestData.posterUrl || 'https://fastly.picsum.photos/id/237/500/500.jpg?hmac=idOEkrJhLd7nEU5pNrAGCyJ6HHJdR_sit1qDt5J3Wo0';
    
    // Fix cast array
    if (!requestData.cast || !Array.isArray(requestData.cast) || requestData.cast.length === 0) {
      requestData.cast = ['لم يتم تحديد الممثلين'];
    } else {
      // Convert any non-string values to strings
      requestData.cast = requestData.cast.map(actor => 
        actor && typeof actor === 'string' ? actor : 'لم يتم تحديد الاسم'
      );
    }

    // For series, ensure seasonsCount and episodesCount are present
    if (requestData.type === 'series') {
      requestData.seasonsCount = requestData.seasonsCount || 1;
      requestData.episodesCount = requestData.episodesCount || 1;
    }

    console.log('Sending data to server:', JSON.stringify(requestData, null, 2));
    try {
      const response = await axiosInstance.post('/works', requestData);
      return response.data;
    } catch (error) {
      console.error('Server error response:', error.response?.data || error.message);
      throw error;
    }
  },

  getAllWorks: async () => {
    const response = await axiosInstance.get('/works/public');
    return response.data;
  },

  getUserWorks: async () => {
    const response = await axiosInstance.get('/works');
    return response.data;
  },

  getWorkById: async (id) => {
    if (!id || id === 'undefined') {
      throw new Error('Work ID is required');
    }
    const response = await axiosInstance.get(`/works/public/${id}`);
    return response.data;
  },

  updateWork: async (id, workData) => {
    if (!id || id === 'undefined') {
      throw new Error('Work ID is required for update');
    }
    
    if (!workData || typeof workData !== 'object') {
      throw new Error('Invalid work data');
    }

    // Convert form data to match backend schema
    let requestData = {
      type: workData.type === 'فيلم' ? 'film' : 'series',
      nameArabic: workData.arabicName || workData.nameArabic || '',
      nameEnglish: workData.englishName || workData.nameEnglish || '',
      year: parseInt(workData.year) || 2000,
      director: workData.director || '',
      assistantDirector: workData.assistantDirector || '',
      genre: workData.genre || '',
      cast: Array.isArray(workData.cast) ? workData.cast.filter(actor => actor && actor.trim() !== '') : [],
      country: workData.country || '',
      filmingLocation: workData.location || workData.filmingLocation || '',
      summary: workData.summary || '',
      posterUrl: workData.posterUrl || '',
    };

    // Add series-specific fields if type is series
    if (workData.type === 'مسلسل') {
      requestData.seasonsCount = parseInt(workData.seasons) || parseInt(workData.seasonsCount) || 1;
      requestData.episodesCount = parseInt(workData.episodes) || parseInt(workData.episodesCount) || 1;
    }

    // Ensure default values for required fields
    requestData.nameArabic = requestData.nameArabic || 'عمل جديد';
    requestData.nameEnglish = requestData.nameEnglish || 'New Work';
    requestData.year = requestData.year || 2000;
    requestData.director = requestData.director || 'غير محدد';
    requestData.assistantDirector = requestData.assistantDirector || 'غير محدد';
    requestData.genre = requestData.genre || 'دراما';
    requestData.country = requestData.country || 'مصر';
    requestData.filmingLocation = requestData.filmingLocation || 'القاهرة';
    requestData.summary = requestData.summary || 'لا يوجد ملخص متاح';
    requestData.posterUrl = requestData.posterUrl || 'https://fastly.picsum.photos/id/237/500/500.jpg?hmac=idOEkrJhLd7nEU5pNrAGCyJ6HHJdR_sit1qDt5J3Wo0';
    
    // Fix cast array
    if (!requestData.cast || !Array.isArray(requestData.cast) || requestData.cast.length === 0) {
      requestData.cast = ['لم يتم تحديد الممثلين'];
    } else {
      // Convert any non-string values to strings and filter empty ones
      requestData.cast = requestData.cast
        .map(actor => actor && typeof actor === 'string' ? actor.trim() : '')
        .filter(actor => actor !== '');
      
      if (requestData.cast.length === 0) {
        requestData.cast = ['لم يتم تحديد الممثلين'];
      }
    }

    // For series, ensure seasonsCount and episodesCount are present
    if (requestData.type === 'series') {
      requestData.seasonsCount = requestData.seasonsCount || 1;
      requestData.episodesCount = requestData.episodesCount || 1;
    }

    console.log('Updating work with ID:', id);
    console.log('Sending update data to server:', JSON.stringify(requestData, null, 2));
    
    try {
      const response = await axiosInstance.patch(`/works/${id}`, requestData);
      console.log('Update successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Server error response:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteWork: async (id) => {
    await axiosInstance.delete(`/works/${id}`);
  }
};
