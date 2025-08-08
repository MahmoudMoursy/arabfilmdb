import Footer from "../componet/Footer";
import Navbar from "../componet/Navbar";
import logo from "../assets/WhatsApp Image 2025-08-03 at 23.32.06_4ba7b00e.jpg";
function PrivacyPolicy() {
    return (
        <>
            <div style={{ backgroundColor: 'black' }}>
                <Navbar />
                <div className="justify-center items-center flex flex-col  my-15">
                    <img src={logo} alt="Logo" width={100} className="items-center" />
                </div>
                <div
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                    }}
                    className="max-w-7xl mx-auto p-10 space-y-10 text-lg mb-15 card rounded-4xl shadow-2xl"
                >

                    <h1 className=" text-amber-500 text-5xl font-bold"> سياسة الخصوصية - ArabFilmDB</h1>

                    <h2 className="text-amber-500 text-4xl font-bold">1. البيانات التي نقوم بجمعها</h2>
                    <p className="text-white text-2xl leading-loose">
                        قد نقوم بجمع معلومات مثل الاسم، البريد الإلكتروني، عنوان IP، نوع الجهاز، وسجل التصفح داخل الموقع.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">2. كيفية استخدام البيانات </h2>
                    <p className="text-white text-2xl leading-loose">
                        نستخدم بياناتك لتحسين خدماتنا، تخصيص تجربة المستخدم، إرسال إشعارات، وتحليل أداء الموقع.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">3. مشاركة البيانات </h2>
                    <p className="text-white text-2xl leading-loose">
                        لا نقوم ببيع أو مشاركة بيانات المستخدم مع أي جهة خارجية إلا إذا تطلب الأمر قانونيًا، أو لحماية حقوقنا.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">4.  الحماية الأمنية </h2>
                    <p className="text-white text-2xl leading-loose">
                        نستخدم إجراءات أمان تقنية وإدارية لحماية بيانات المستخدم من الوصول غير المصرح به أو التعديل أو الحذف.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">5. الكوكيز </h2>
                    <p className="text-white text-2xl leading-loose">
                        نستخدم ملفات تعريف الارتباط لتحليل سلوك الزوار وتحسين الأداء. يحق لك رفض الكوكيز من إعدادات المتصفح.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">6. حقوق المستخدم</h2>
                    <p className="text-white text-2xl leading-loose">
                        لك الحق في طلب الاطلاع على بياناتك أو تعديلها أو حذفها في أي وقت عبر التواصل معنا.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">7. مدة الاحتفاظ بالبيانات</h2>
                    <p className="text-white text-2xl leading-loose">
                        نحتفظ بالبيانات طالما أن حسابك نشط أو حسب ما تقتضيه القوانين.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">8. التحديثات  </h2>
                    <p className="text-white text-2xl leading-loose">
                        قد نقوم بتعديل سياسة الخصوصية، وسيتم إعلامك بأي تغييرات من خلال هذه الصفحة.
                    </p>
                    <h2 className="text-amber-500 text-4xl font-bold">9. تواصل معنا  </h2>
                    <p className="text-white text-2xl leading-loose">
                        لأي استفسارات أو طلبات تتعلق ببياناتك، راسلنا على: contact@arabfilmdb.com
                    </p>




                </div>
                <Footer />
            </div>
        </>
    );
}
export default PrivacyPolicy;