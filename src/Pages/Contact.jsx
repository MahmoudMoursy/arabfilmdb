import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
} from "lucide-react";
import "../App.css";
import Footer from "../componet/Footer";
import Navbar from "../componet/Navbar";

function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "اسم المستخدم مطلوب";

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }

    if (!formData.message.trim()) newErrors.message = "الرسالة مطلوبة";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form submitted:", formData);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          username: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-white">
      <Navbar />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
         
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-[var(--color-accent)]">
              تواصل معنا
            </h3>
            <p className="text-gray-300 text-lg">
              نحن هنا للاستماع إليك ومساعدتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center bg-[var(--color-dark)] p-6 rounded-xl shadow hover:shadow-lg transition">
              <Mail className="text-[var(--color-accent)] mb-3" size={32} />
              <h4 className="font-semibold text-lg mb-1">البريد الإلكتروني</h4>
              <p className="text-gray-400">info@example.com</p>
            </div>
            <div className="flex flex-col items-center bg-[var(--color-dark)] p-6 rounded-xl shadow hover:shadow-lg transition">
              <Phone className="text-[var(--color-accent)] mb-3" size={32} />
              <h4 className="font-semibold text-lg mb-1">الهاتف</h4>
              <p className="text-gray-400">+966 50 123 4567</p>
            </div>
            <div className="flex flex-col items-center bg-[var(--color-dark)] p-6 rounded-xl shadow hover:shadow-lg transition">
              <MapPin className="text-[var(--color-accent)] mb-3" size={32} />
              <h4 className="font-semibold text-lg mb-1">العنوان</h4>
              <p className="text-gray-400">الرياض، المملكة العربية السعودية</p>
            </div>
          </div>


          <div className="bg-[var(--color-dark)] rounded-xl p-8 shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-8 bg-green-600/20 border border-green-500 rounded-lg">
                <h4 className="text-green-400 text-xl font-semibold mb-2">
                  تم إرسال الرسالة بنجاح!
                </h4>
                <p className="text-gray-300">
                  شكراً لتواصلك معنا، سنقوم بالرد عليك قريباً
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm">
                    اسم المستخدم
                  </label>
                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم المستخدم"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white border border-[var(--color-grayy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white border border-[var(--color-grayy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm">
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+966 50 123 4567"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white border border-[var(--color-grayy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm">
                    رسالتك
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--color-secondary)] text-white border border-[var(--color-grayy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] min-h-[120px]"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[var(--color-accent)] text-black font-semibold hover:opacity-90 transition"
                >
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>

          
          <div className="flex justify-center gap-6 mt-12">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 transition"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-sky-500 transition"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-pink-500 transition"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://wa.me/966501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-green-500 transition"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
