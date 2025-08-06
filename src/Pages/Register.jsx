/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const schema = z.object({
        name: z.string().min(7, "الاسم يجب أن يكون أكثر من 7 أحرف").max(20, 'الاسم يجب أن يكون أقل من 20 حرف'),
        email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
        password: z.string().min(10, "كلمة المرور يجب أن تكون أكثر من 10 أحرف").max(20, 'كلمة المرور يجب أن تكون أقل من 20 حرف'),
        confirmPassword: z.string().min(10, "كلمة المرور يجب أن تكون أكثر من 10 أحرف").max(20, 'كلمة المرور يجب أن تكون أقل من 20 حرف'),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "كلمتا المرور غير متطابقتين",
        path: ["confirmPassword"],
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });


    const onSubmit = (data) => {
        try {
            setLoading(true);
            console.log(data);
            navigate("/welcome");
        } catch (errors) {
            setSignupError("حدث خطأ أثناء التسجيل");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen  text-foreground">
            <div style={{ backgroundColor: "black" }} className="min-h-screen flex  justify-center bg-background py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user-plus mx-auto h-12 w-12 text-yellow-500"
                            aria-hidden="true"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <line x1="19" x2="19" y1="8" y2="14"></line>
                            <line x1="22" x2="16" y1="11" y2="11"></line>
                        </svg>
                        <h2 className="mt-4 text-4xl font-bold text-white">إنشاء حساب جديد</h2>
                        <p className="mt-2 text-md text-white">
                            أو <p className="font-medium text-yellow-500 hover:text-yellow-600 transition-colors" onClick={() => navigate("/Login")}>
                                تسجيل الدخول إلى حسابك
                            </p>
                        </p>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-1 space-y-1">
                        <div className="space-y-3">
                            <div>
                                <label for="name" className="block text-lg font-medium text-foreground mb-2 text-white">الاسم الكامل</label>
                                <div className="relative">
                                    <input type="text" {...register("name")} id="name" required className="w-full px-6 py-4 pr-13 bg-input border border-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-white" placeholder="أدخل اسمك الكامل" dir="rtl" style={{ backgroundColor: '#262626' }} />
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
                                        className="lucide lucide-user absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                                        aria-hidden="true"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-5">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label for="email" className="block text-lg font-medium text-foreground mb-2 text-white">البريد الإلكتروني</label>
                                <div className="relative">
                                    <input type="email" {...register("email")} id="email" required className="w-full px-4 py-3 pr-12 bg-input border border-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-white" placeholder="أدخل بريدك الإلكتروني" dir="rtl" style={{ backgroundColor: '#262626' }} />
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
                                        className="lucide lucide-mail absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                                        aria-hidden="true"
                                    >
                                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                    </svg>
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-5">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label for="password" className="block text-lg font-medium text-foreground mb-2 text-white">كلمة المرور</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        id="password"
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-input border border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-white"
                                        placeholder="أدخل كلمة المرور"
                                        dir="rtl"
                                        style={{ backgroundColor: '#262626' }}
                                    />

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
                                        className="lucide lucide-lock absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                                        aria-hidden="true"
                                    >
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>


                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="lucide lucide-eye-off"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M17.94 17.94A10.93 10.93 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.06-2.81 2.9-5.19 5.26-6.67" />
                                                <path d="M1 1l22 22" />
                                            </svg>

                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="lucide lucide-eye"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2.062 12.348a1 1 0 0 1 0-.696A10.75 10.75 0 0 1 21.938 12.348a1 1 0 0 1 0 .696A10.75 10.75 0 0 1 2.062 12.348z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>

                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-5">{errors.password.message}</p>}
                            <div>
                                <label for="confirmPassword" className="block text-lg font-medium text-foreground mb-2 text-white">تأكيد كلمة المرور</label>
                                <div className="relative">
                                    <input type="password" {...register("confirmPassword")} id="confirmPassword" required className="w-full px-4 py-3 pr-12 bg-input border border-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-white" placeholder="أدخل تأكيد كلمة المرور" dir="rtl" style={{ backgroundColor: '#262626' }} />
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
                                        className="lucide lucide-lock absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                                        aria-hidden="true"
                                    >
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-5">{errors.confirmPassword.message}</p>}
                            <div className="flex items-center">
                                <input id="terms" required="" className="h-4 w-4 text-primary focus:ring-primary border-border rounded" type="checkbox" name="terms"></input>
                                <label for="terms" className="mr-2 block text-lg text-white">أوافق على <a href="#" className="text-amber-300 hover:text-primary/80 transition-colors">الشروط والأحكام</a> و <a href="#" className="text-amber-300 hover:text-primary/80 transition-colors">سياسة الخصوصية</a></label>
                            </div>
                            {signupError && <p>{signupError}</p>}
                            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-bold rounded-lg text-white  hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors" style={{ backgroundColor: 'var(--color-accent)' }}>
                                {loading ? "جاري التسجيل..." : " تسجيل الدخول"}
                            </button>
                        </div>
                    </form>
                    <div className="text-center"><a className="text-md text-gray-400 hover:text-white transition-colors" href="/" data-discover="true">العودة إلى الصفحة الرئيسية</a></div>
                </div>
            </div>
        </div>
    );
}
export default Register;