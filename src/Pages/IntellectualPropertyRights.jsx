import Footer from "../componet/Footer";
import Navbar from "../componet/Navbar";
function IntellectualPropertyRights() {
    return (

        <>

            <div style={{ backgroundColor: 'black' }}>
                <Navbar />

                <div
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                    }}
                    className="max-w-7xl mx-auto p-10 space-y-10 text-lg my-15 "
                >

                    <h1 className=" text-amber-500 text-5xl font-bold">إشعار الملكية الفكرية</h1>
                    <p className="text-white text-2xl leading-loose">
                        جميع المحتويات البرمجية والتصميمات الخاصة بموقع ArabFilmDB مملوكة بالكامل لصاحب المشروع.</p>
                    <p className="text-white text-2xl leading-loose">
                        نحن نحترم حقوق الملكية الفكرية. إذا كنت مالكاً لحقوق نشر وتعتقد أن هناك انتهاكاً داخل الموقع، يرجى التواصل معنا عبر البريد:
                    </p>
                    <p className=" text-amber-500 text-xl font-bold">
                        <a href="mailto:contact@arabfilmdb.com">contact@arabfilmdb.com</a>
                    </p>
                    <p className="text-white text-2xl leading-loose">
                        وسوف نقوم بمراجعة البلاغ واتخاذ الإجراء المناسب.                    </p>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default IntellectualPropertyRights;