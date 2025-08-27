import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { workService } from '../api/workService';

function Dashboard() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [works, setWorks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        type: 'فيلم',
        arabicName: '',
        englishName: '',
        year: '',
        director: '',
        assistantDirector: '',
        genre: '',
        actors: [''],
        country: '',
        location: '',
        summary: '',
        posterUrl: '',
        seasons: '',
        episodes: ''
    });

    const fetchWorks = () => {
        workService.getUserWorks().then(setWorks).catch(() => {});
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        setRole(user.role);
        fetchWorks();
    }, [navigate]);

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (name === 'actors' && index !== null) {
            const updatedActors = [...formData.actors];
            updatedActors[index] = value;
            setFormData({ ...formData, actors: updatedActors });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addActor = () => {
        setFormData({ ...formData, actors: [...formData.actors, ''] });
    };

    const removeActor = (index) => {
        if (formData.actors.length > 1) {
            const updatedActors = formData.actors.filter((_, i) => i !== index);
            setFormData({ ...formData, actors: updatedActors });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedData = {
            type: formData.type,
            arabicName: formData.arabicName.trim(),
            englishName: formData.englishName.trim(),
            year: parseInt(formData.year) || 2000,
            director: formData.director.trim(),
            assistantDirector: formData.assistantDirector.trim(),
            genre: formData.genre.trim(),
            cast: formData.actors.filter(actor => actor.trim() !== ''),
            country: formData.country.trim(),
            location: formData.location.trim(),
            summary: formData.summary.trim(),
            posterUrl: formData.posterUrl.trim()
        };

        if (formData.type === 'مسلسل') {
            cleanedData.seasonsCount = parseInt(formData.seasons) || 1;
            cleanedData.episodesCount = parseInt(formData.episodes) || 1;
        }

        try {
            await workService.createWork(cleanedData, true);
            alert('تم إضافة العمل بنجاح');
            setFormData({
                type: 'فيلم',
                arabicName: '',
                englishName: '',
                year: '',
                director: '',
                assistantDirector: '',
                genre: '',
                actors: [''],
                country: '',
                location: '',
                summary: '',
                posterUrl: '',
                seasons: '',
                episodes: ''
            });
            setShowAddForm(false);
            fetchWorks();
        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.errors?.[0]?.msg || 
                                error.message ||
                                'حدث خطأ أثناء إضافة العمل';
            alert(errorMessage);
        }
    };

    return (
        <div className="dashboard bg-black min-h-screen">
            {role === 'admin' ? (
              <>
                <AdminDashboard />
              </>
            ) : role === 'publisher' ? (
              <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-white">لوحة تحكم الناشر</h1>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-6 py-3 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-500 transition"
                  >
                    {showAddForm ? 'إخفاء نموذج الإضافة' : '+ إضافة عمل جديد'}
                  </button>
                </div>

                {/* Add Form - Collapsible */}
                {showAddForm && (
                  <div className="mb-8 bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">إضافة عمل جديد</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-white">نوع العمل *</label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          >
                            <option value="فيلم">فيلم</option>
                            <option value="مسلسل">مسلسل</option>
                          </select>
                        </div>

                        <div>
                          <label className="block mb-1 text-white">الاسم بالعربية *</label>
                          <input
                            type="text"
                            name="arabicName"
                            value={formData.arabicName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">الاسم بالإنجليزية *</label>
                          <input
                            type="text"
                            name="englishName"
                            value={formData.englishName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">السنة *</label>
                          <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            min="1800"
                            max="3000"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">المخرج *</label>
                          <input
                            type="text"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">مساعد المخرج *</label>
                          <input
                            type="text"
                            name="assistantDirector"
                            value={formData.assistantDirector}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">النوع *</label>
                          <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">الدولة *</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-white">موقع التصوير *</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                          />
                        </div>

                        {formData.type === 'مسلسل' && (
                          <>
                            <div>
                              <label className="block mb-1 text-white">عدد المواسم *</label>
                              <input
                                type="number"
                                name="seasons"
                                value={formData.seasons}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                              />
                            </div>

                            <div>
                              <label className="block mb-1 text-white">عدد الحلقات *</label>
                              <input
                                type="number"
                                name="episodes"
                                value={formData.episodes}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div>
                        <label className="block mb-1 text-white">الأبطال *</label>
                        {formData.actors.map((actor, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              name="actors"
                              value={actor}
                              onChange={(e) => handleChange(e, index)}
                              required
                              className="flex-1 p-2 rounded bg-gray-700 text-white"
                              placeholder={`الممثل ${index + 1}`}
                            />
                            {formData.actors.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeActor(index)}
                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                              >
                                حذف
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addActor}
                          className="text-sm text-amber-300 hover:underline"
                        >
                          + أضف بطل آخر
                        </button>
                      </div>

                      <div>
                        <label className="block mb-1 text-white">الملخص *</label>
                        <textarea
                          name="summary"
                          value={formData.summary}
                          onChange={handleChange}
                          rows="4"
                          required
                          className="w-full p-2 rounded bg-gray-700 text-white"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block mb-1 text-white">رابط البوستر *</label>
                        <input
                          type="url"
                          name="posterUrl"
                          value={formData.posterUrl}
                          onChange={handleChange}
                          required
                          className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-500 transition"
                        >
                          إضافة العمل
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Works List */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">أعمالي</h2>
                    <span className="text-gray-300">عدد الأعمال: {works.length}</span>
                  </div>
                  
                  {works.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-lg">لا توجد أعمال حتى الآن</p>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                      >
                        أضف عملك الأول
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {works.map(w => (
                        <div key={w._id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{w.nameArabic}</h3>
                            <p className="text-gray-300">{w.nameEnglish}</p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-400">
                              <span>السنة: {w.year}</span>
                              <span>النوع: {w.type === 'film' ? 'فيلم' : 'مسلسل'}</span>
                              <span>المخرج: {w.director}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => navigate(`/dashboard/edit/${w._id}`)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
                            >
                              تعديل
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
                                  workService.deleteWork(w._id)
                                    .then(() => {
                                      fetchWorks();
                                      alert('تم حذف العمل بنجاح');
                                    })
                                    .catch(error => {
                                      console.error('Error deleting work:', error);
                                      alert('حدث خطأ أثناء حذف العمل');
                                    });
                                }
                              }}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
        </div>
    );
}

export default Dashboard;
