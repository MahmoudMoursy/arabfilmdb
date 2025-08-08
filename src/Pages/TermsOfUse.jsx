import Footer from "../componet/Footer";
import Navbar from "../componet/Navbar";
import logo from "../assets/WhatsApp Image 2025-08-03 at 23.32.06_4ba7b00e.jpg";

function TermsOfUse() {
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

                    <h1 className=" text-amber-500 text-5xl font-bold">شروط الاستخدام - ArabFilmDB</h1>

                    <h2 className="text-amber-500 text-4xl font-bold">1. المقدمة</h2>
                    <p className="text-white text-2xl leading-loose">
                        باستخدامك لموقع ArabFilmDB، فإنك توافق على الالتزام الكامل بالشروط والأحكام المنصوص عليها في هذه الاتفاقية. إذا لم توافق على أي جزء من هذه الشروط، يجب عليك التوقف فورًا عن استخدام الموقع.
                    </p>

                    <h2 className="text-amber-500 text-4xl font-bold">2. الملكية الفكرية</h2>
                    <p className="text-white text-2xl leading-loose">جميع الحقوق المتعلقة بالمحتوى، والتصميم، والرمز البرمجي، وقاعدة البيانات، والشعار، والعلامة التجارية لموقع ArabFilmDB هي ملك حصري لصاحب المشروع، ولا يجوز إعادة إنتاجها أو استخدامها دون إذن كتابي مسبق.</p>

                    <h2 className="text-amber-500 text-4xl font-bold">3. استخدام الموقع</h2>
                    <p className="text-white text-2xl leading-loose">يُحظر استخدام الموقع لأي نشاط غير قانوني أو ينتهك حقوق الغير. كما يُمنع استخدام الموقع لنشر أو توزيع محتوى مسيء أو مخل أو محمي بحقوق ملكية دون ترخيص.</p>

                    <h2 className="text-amber-500 text-4xl font-bold">4. دقة المحتوى</h2>
                    <p className="text-white text-2xl leading-loose">نحن نسعى لتقديم معلومات دقيقة، لكن لا نضمن خلوها من الأخطاء أو التحديث الفوري. المستخدم يعتمد على المعلومات في الموقع على مسؤوليته الشخصية.</p>

                    <h2 className="text-amber-500 text-4xl font-bold">5. الحسابات والمستخدمين</h2>
                    <p className="text-white text-2xl leading-loose">يجب على المستخدمين الحفاظ على سرية بيانات الدخول، وهم مسؤولون عن جميع الأنشطة التي تتم عبر حساباتهم.</p>

                    <h2 className="text-amber-500 text-4xl font-bold">6. التعديلات</h2>
                    <p className="text-white text-2xl leading-loose">نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. استمرار استخدام الموقع يعني موافقتك على التعديلات.</p>

                    <h2 className="text-amber-500 text-4xl font-bold">7. الإنهاء</h2>
                    <p className="text-white text-2xl leading-loose">يحق لإدارة الموقع تعليق أو إنهاء وصول أي مستخدم في حال انتهاك الشروط دون إشعار مسبق.</p>

                    <h2 className="text-amber-500 text-4xl font-bold">8. القانون المعمول به</h2>
                    <p className="text-white text-2xl leading-loose">تخضع هذه الاتفاقية لقوانين المملكة العربية السعودية، ويكون الاختصاص القضائي لمحاكم مدينة تبوك.</p>




                </div>
                <Footer />
            </div>
        </>
    );
}
export default TermsOfUse;
