import React, { useState, useEffect } from 'react';
import "/src/App.css";
import logo from "/src/assets/WhatsApp Image 2025-08-03 at 23.32.06_4ba7b00e.jpg"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
                closeMobileMenu();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobileMenuOpen]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                closeMobileMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div dir="rtl">

            <nav className="shadow-lg border-b border-gray-200" style={{ backgroundColor: "var(--color-dark)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
                    <div className="flex justify-between items-center h-16">

                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src={logo} alt="Logo" className="h-13" />
                            </div>
                        </div>



                        <div className="hidden lg:flex items-center justify-center flex-1 mx-9">
                            <ul className="flex flex-row-reverse gap-15" dir="rtl">

                                <li>
                                    <a href="#" className="text-white hover:text-amber-300 text-lg font-extrabold transition-colors duration-200">
                                        الافلام
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-amber-300 text-lg font-extrabold transition-colors duration-200">
                                        المسلسلات
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-amber-300 text-lg font-extrabold transition-colors duration-200">
                                        الرئيسية
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="hidden md:flex items-center ml-10">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="البحث عن فيلم او مسلسل ..."
                                    className="w-64 pl-10 pr-4 py-2  border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-transparent text-right text-white" style={{ backgroundColor: "var(--color-grayy" }}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="w-4 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>

                                </div>
                            </div>
                        </div>


                        <div className="flex items-center space-x-reverse space-x-4">

                            <button
                              onClick={() => navigate('/Login')}  className="text-white mx-3 px-5 py-2 rounded-lg text-lg font-bold transition-colors duration-200 hover:text-[var(--color-accent)]"
                            >         <button className='text-white hover:text-[var(--color-accent)] transition-colors duration-200'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-log-in w-5 h-5 inline-block mr-2"
                                        aria-hidden="true"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                </button>                       تسجيل الدخول
                            </button>

                            <button
                                onClick={() => navigate('/Register')}
                                className="border border-gray-700 hover:bg-blue-50 mx-3 px-5 py-2 rounded-lg text-lg font-extrabold transition-colors duration-200" style={{ backgroundColor: "var(--color-accent)" }}  >
                                إنشاء حساب
                            </button>
                        </div>
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="mobile-menu-button text-white hover:text-amber-300 focus:outline-none focus:text-amber-300 transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {isMobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>

                <div className={`mobile-menu lg:hidden bg-white border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                            onClick={closeMobileMenu}
                        >
                            الرئيسية
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                            onClick={closeMobileMenu}
                        >
                            الافلام
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                            onClick={closeMobileMenu}
                        >
                            المسلسلات
                        </a>


                        <div className="px-3 py-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="البحث..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;