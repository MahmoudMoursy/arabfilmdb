import { useState, useEffect } from 'react';
import Footer from '../componet/Footer';
import Navbar from '../componet/Navbar';

export default function FilmForm() {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const correctEmail = "mettuo@gmail.com";
  const correctPassword = "mettuo1289";
   useEffect(() => {
   const verified = sessionStorage.getItem("dashboardVerified");
    if (verified === "true") {
    setIsVerified(true);
    }
  }, []);
  const handleSubmitt = (e) => {
    e.preventDefault();

    if (email === correctEmail && password === correctPassword) {
      sessionStorage.setItem("dashboardVerified", "true");
      setIsVerified(true); 
    } else {
      alert("الإيميل أو كلمة المرور غير صحيحة");
    }
  };
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
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-black text-white">
      <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {!isVerified ? (
            <form onSubmit={handleSubmitt} className="space-y-6 bg-gray-900/50 p-6 rounded-lg">

              <input
                type="email"
                placeholder="الإيميل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-gray-400"
              />

              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-gray-400"
              />

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-500"
              >
                دخول
              </button>
            </form>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">أهلاً بك في لوحة التحكم</h1>
              <p className="mt-4">محتوى الداشبورد هنا...</p>
            </div>
          )}
        </div>
      </div>
    </div>
        );
  }
  return (
    <>
      <Navbar />
      <div className='bg-black py-20'>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block mb-1">نوع العمل *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            >
              <option value="فيلم">فيلم</option>
              <option value="مسلسل">مسلسل</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">الاسم بالعربية *</label>
            <input
              type="text"
              name="arabicName"
              value={formData.arabicName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">الاسم بالإنجليزية *</label>
            <input
              type="text"
              name="englishName"
              value={formData.englishName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">السنة *</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">المخرج *</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">مساعد المخرج *</label>
            <input
              type="text"
              name="assistantDirector"
              value={formData.assistantDirector}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">النوع *</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
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
            <button
              type="button"
              onClick={addActor}
              className="text-sm text-amber-300 hover:underline"
            >
              + أضف بطل آخر
            </button>
          </div>

          <div>
            <label className="block mb-1">الدولة *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">موقع التصوير *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">الملخص *</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 rounded bg-gray-700"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1">رابط البوستر *</label>
            <input
              type="url"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          {formData.type === 'مسلسل' && (
            <>
              <div>
                <label className="block mb-1">عدد المواسم *</label>
                <input
                  type="number"
                  name="seasons"
                  value={formData.seasons}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>

              <div>
                <label className="block mb-1">عدد الحلقات *</label>
                <input
                  type="number"
                  name="episodes"
                  value={formData.episodes}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="bg-amber-300 text-black font-bold px-6 py-2 rounded hover:bg-amber-400 transition"
          >
            إرسال
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
