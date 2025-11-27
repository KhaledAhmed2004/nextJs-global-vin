"use client"
import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoginMutation } from '@/app/redux/features/auth/authApis';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '@/app/redux/features/auth/authSlice';
import { toast } from 'sonner';
import { RootState } from '@/app/redux/store';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberPassword: false
  });

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  // Handle successful login


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const toastId = toast.loading("Please wait ...");

  try {
    const result = await login({
      email: formData.email,
      password: formData.password,
    }).unwrap();

    const token = result?.data?.token;
    const user = result?.data?.user;

    if (token) {
      localStorage.setItem("token", token);
      dispatch(setToken(token));
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
    }

    // Success - show toast and redirect
    toast.success(result?.message || "Login successful!", { id: toastId, duration: 2000 });
    router.push("/dashboard");
  } catch (err: any) {
    console.error("Login failed:", err);
    toast.error(err?.data?.message || err?.message || "Login failed.", { id: toastId, duration: 3000 });
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image and Text */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src="/logImg.jpg"
            alt="Car background"
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Welcome back,<br />Admin.
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 max-w-md">
            E Parts Admin Panel — your control center for managing products, monitoring performance, and ensuring smooth operations.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">Login to your admin account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-base min-h-[44px]"
                    required
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-base min-h-[44px]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Password & Forgot Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <label className="flex items-center cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    name="rememberPassword"
                    checked={formData.rememberPassword}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember Password</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium min-h-[44px] flex items-center">
                  Forgot Password
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg min-h-[48px]"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-gray-900 font-semibold hover:text-purple-600">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;