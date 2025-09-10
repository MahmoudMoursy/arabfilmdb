import React, { useState, useEffect } from 'react';
import "/src/App.css";
import logo from "/src/assets/WhatsApp_Image_2025-09-01_at_19.08.17_1b74120e-removebg-preview.png"
import MovieFilterDemo from '../Pages/MovieFilterDemo';
import SeriesFilterDemo from '../Pages/SeriesFilterDemo';
import { useNavigate, useLocation } from 'react-router-dom';
import { User,LogOut, PlusCircle } from "lucide-react";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const getSearchTarget = () => {
        const path = location.pathname || '';
        if (path.toLowerCase().includes('/seriesfilterdemo')) return '/SeriesFilterDemo';
        if (path.toLowerCase().includes('/moviefilterdemo')) return '/MovieFilterDemo';
        return '/MovieFilterDemo';
    };

    const triggerSearch = () => {
        const q = (search || '').trim();
        const target = getSearchTarget();
        const searchStr = q.length ? `?q=${encodeURIComponent(q)}` : '';
        navigate(`${target}${searchStr}`);
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

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/Login');
    }

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
        <>
            <div dir="rtl">
                <nav
                    className="shadow-2xl border-b border-white/20 backdrop-blur-sm relative z-50"
                    style={{ backgroundColor: "var(--color-dark)" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex justify-between items-center h-20">

                            <div className="flex items-center group">
                                <div className="flex-shrink-0 transform transition-all duration-300 group-hover:scale-105">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-32 w-auto drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
                                <ul className="flex flex-row-reverse gap-12" dir="rtl">
                                    <li className="relative group">
                                        <a
                                            onClick={() => navigate('/MovieFilterDemo')}
                                            className="relative text-white hover:text-amber-300 text-lg font-bold transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                                        >
                                            الافلام
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                    <li className="relative group">
                                        <a
                                            onClick={() => navigate('/SeriesFilterDemo')}
                                            className="relative text-white hover:text-amber-300 text-lg font-bold transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                                        >
                                            المسلسلات
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                    <li className="relative group">
                                        <a
                                            href="/"
                                            className="relative text-white hover:text-amber-300 text-lg font-bold transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                                        >
                                            الرئيسية
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="hidden md:flex items-center ml-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="ابحث في الموقع..."
                                        className="w-72 pl-12 pr-4 py-3 border border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-amber-300/50 focus:border-amber-300 focus:outline-none text-right text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm hover:border-gray-500 focus:shadow-lg focus:shadow-amber-300/20"
                                        style={{ backgroundColor: "var(--color-grayy)" }}
                                        value={search}
                                        onChange={(e)=>setSearch(e.target.value)}
                                        onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); triggerSearch(); } }}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                        <button onClick={triggerSearch} className="text-gray-400 hover:text-amber-300 transition-colors duration-300">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-300/10 to-yellow-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {(!user) ? (<div className="flex items-center space-x-reverse space-x-4">
                                <button
                                    onClick={() => navigate('/Login')}
                                    className="group flex items-center text-white mx-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:text-amber-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 hover:shadow-lg
                            sm:px-5 sm:py-2.5 sm:text-sm
                               max-sm:px-4 max-sm:py-2 max-sm:text-xs"
                                >
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
                                        className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    تسجيل الدخول
                                </button>


                                <button
                                    onClick={() => navigate('/Register')}
                                    className="group relative overflow-hidden border border-gray-600/50 hover:border-amber-300/50 mx-2 px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-300/20 hover:-translate-y-0.5
                                                      sm:px-5 sm:py-2.5 sm:text-sm
                                         max-sm:px-4 max-sm:py-2 max-sm:text-xs"
                                    style={{ backgroundColor: "var(--color-accent)" }}
                                >
                                    <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
                                        إنشاء حساب
                                    </span>

                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                </button>

                            </div>) : (
                                <div className="relative inline-flex items-center gap-4 text-left">
                                    {/* <div className="flex items-center gap-3">
                                        {( user?.role === 'publisher') && (
                                            <button
                                                onClick={() => navigate('/dashboard')}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-black hover:opacity-90 shadow"
                                                style={{ backgroundColor: "var(--color-accent)" }}
                                            >
                                                <PlusCircle className="w-5 h-5" />
                                                لوحة التحكم
                                            </button>
                                        )}
                                    </div> */}
                                    <div className="relative inline-block">
                                        <button
                                            onClick={() => setOpen(!open)}
                                            className="flex items-center gap-2 md:px-12 px-2 py-2 rounded-lg border border-gray-600/50 bg-[var(--color-accent)] hover:border-amber-300/50 transition-all duration-300"
                                        >
                                            <User className="w-7 h-6 text-black" />
                                            <span className="text-black font-bold ">{user?.username}</span>
                                        </button>

                                        {open && (
                                            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-[var(--color-secondary)] border border-gray-600/50 overflow-hidden z-20">
                                                <button
                                                    onClick={() => navigate("/profile")}
                                                    className="w-full text-right px-6 py-3 text-white text-sm hover:bg-amber-500/20 transition-colors"
                                                >
                                                    <User className="w-5 h-5 mx-2 text-white inline-block mr-2" />
                                                    الملف الشخصي
                                                </button>

                                                {(user?.role === 'admin' || user?.role === 'publisher') && (
                                                    <button
                                                        onClick={() => navigate("/dashboard")}
                                                        className="w-full text-right px-6 py-3 text-white text-sm hover:bg-amber-500/20 transition-colors"
                                                    >
                                                        <PlusCircle className="w-5 h-5 mx-2 text-white inline-block mr-2" />
                                                        لوحة التحكم
                                                    </button>
                                                )}

                                                <button
                                                    onClick={logout}
                                                    className="flex items_center  gap-2 w-full text-right px-6 py-3 text-white text-sm hover:bg-red-500/20 transition-colors"
                                                >
                                                    <LogOut className="w-5 h-5 mx-2 text-white inline-block mr-2" /> 
                                                    تسجيل خروج
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="lg:hidden">
                                <button
                                    onClick={toggleMobileMenu}
                                    className="mobile-menu-button relative p-3 text-white hover:text-amber-300 focus:outline-none focus:text-amber-300 transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                                >
                                    <svg
                                        className="w-6 h-6 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
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

                    <div
                        className={`mobile-menu lg:hidden border-t border-white/10 backdrop-blur-md transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                            }`}
                        style={{ backgroundColor: "var(--color-dark)" }}
                    >
                        <div className="px-6 pt-4 pb-6 space-y-3">
                            {/* Mobile Navigation Links */}
                            <a
                                href="/"
                                className="block px-4 py-3 text-white hover:text-amber-300 hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 border border-transparent hover:border-white/20"
                                onClick={closeMobileMenu}
                            >
                                الرئيسية
                            </a>
                            <a
                                href="/MovieFilterDemo"
                                className="block px-4 py-3 text-white hover:text-amber-300 hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 border border-transparent hover:border-white/20"
                                onClick={closeMobileMenu}
                            >
                                الافلام
                            </a>
                            <a
                                href="/SeriesFilterDemo"
                                className="block px-4 py-3 text-white hover:text-amber-300 hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 border border-transparent hover:border-white/20"
                                onClick={closeMobileMenu}
                            >
                                المسلسلات
                            </a>

                            {(user?.role === 'admin' || user?.role === 'publisher') && (
                                <button
                                    onClick={() => { navigate('/dashboard'); closeMobileMenu(); }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-black transition-all duration-300"
                                    style={{ backgroundColor: "var(--color-accent)" }}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    إضافة عمل
                                </button>
                            )}
                            {user?.role === 'admin' && (
                                <button
                                    onClick={() => { navigate('/AdminDashboard'); closeMobileMenu(); }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-black transition-all duration-300"
                                    style={{ backgroundColor: "var(--color-accent)" }}
                                >
                                    لوحة التحكم
                                </button>
                            )}

                            {!user && <div className="pt-4 space-y-3">
                                <button
                                    onClick={() => {
                                        navigate('/Login');
                                        closeMobileMenu();
                                    }}
                                    className="w-full flex items-center justify-center text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:text-amber-300 hover:bg-white/10 border border-transparent hover:border-white/20"
                                >
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
                                        className="w-5 h-5 ml-2"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    تسجيل الدخول
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Register');
                                        closeMobileMenu();
                                    }}
                                    className="w-full px-1 py-2 rounded-xl font-bold transition-all duration-300 text-white hover:shadow-lg"
                                    style={{ backgroundColor: "var(--color-accent)" }}
                                >
                                    إنشاء حساب
                                </button>
                            </div>}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;