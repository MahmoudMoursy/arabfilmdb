import { useState } from 'react';
import Footer from '../componet/Footer';
import Navbar from '../componet/Navbar';
export default function FilmForm() {
  const [formData, setFormData] = useState({
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
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
    <Navbar />
    <div className='bg-black py-20'>
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg space-y-6">
      <div>
        <label className="block mb-1">الاسم بالعربية *</label>
        <input type="text" name="arabicName" value={formData.arabicName} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">الاسم بالإنجليزية *</label>
        <input type="text" name="englishName" value={formData.englishName} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">السنة *</label>
        <input type="text" name="year" value={formData.year} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">المخرج *</label>
        <input type="text" name="director" value={formData.director} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">مساعد المخرج *</label>
        <input type="text" name="assistantDirector" value={formData.assistantDirector} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">النوع *</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">الأبطال *</label>
        {formData.actors.map((actor, index) => (
          <input
            key={index}
            type="text"
            name="actors"
            value={actor}
            onChange={(e) => handleChange(e, index)}
            required
            className="w-full p-2 mb-2 rounded bg-gray-700"
          />
        ))}
        <button type="button" onClick={addActor} className="text-sm text-amber-300 hover:underline">+ أضف بطل آخر</button>
      </div>

      <div>
        <label className="block mb-1">الدولة *</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">موقع التصوير *</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div>
        <label className="block mb-1">الملخص *</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} rows="4" required className="w-full p-2 rounded bg-gray-700"></textarea>
      </div>

      <div>
        <label className="block mb-1">رابط البوستر *</label>
        <input type="url" name="posterUrl" value={formData.posterUrl} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
      </div>

      <button type="submit" className="bg-amber-300 text-black font-bold px-6 py-2 rounded hover:bg-amber-400 transition">إرسال</button>
    </form>
    </div>
    <Footer />
            </>
  );
}
