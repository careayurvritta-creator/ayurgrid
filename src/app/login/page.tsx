"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "./actions";
import { Leaf, Quote, Mail, Eye, EyeOff, MessageSquare, Lock, ShieldCheck, Loader2 } from "lucide-react";

// Form Schema
const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await login(data);

            if (result.error) {
                setError(result.error);
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark text-white font-sans selection:bg-primary selection:text-white">
            {/* Left Brand Panel (40%) */}
            <div className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-[#151e15] p-12 lg:flex">
                {/* Dynamic Mesh Gradient Background */}
                <div className="absolute inset-0 bg-mesh-copper opacity-80" data-alt="Abstract copper and green mesh gradient background"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>

                {/* Logo Area */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                        <Leaf className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Ayurgrid</span>
                </div>

                {/* Testimonial Card */}
                <div className="glass-panel animate-float relative z-10 mx-auto w-full max-w-md rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6 text-primary">
                        <Quote className="h-8 w-8 fill-current" />
                    </div>
                    <blockquote className="mb-6 text-xl font-medium leading-relaxed text-white/90">
                        &quot;Ayurveda is the science of life, and Ayurgrid brings that science into the modern digital era with precision and respect for tradition.&quot;
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/30 relative">
                            <Image
                                alt="Portrait of Dr. Vasant Lad"
                                fill
                                className="object-cover"
                                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop"
                            />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-white">Dr. Vasant Lad</p>
                            <p className="text-sm text-gray-300">BAMS, MASc</p>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="relative z-10 text-xs text-white/40">
                    © 2024 Ayurgrid Health Technologies. All rights reserved.
                </div>
            </div>

            {/* Right Login Panel (60%) */}
            <div className="flex flex-1 flex-col items-center justify-center bg-background-dark px-6 py-12 sm:px-12 xl:px-24">
                {/* Mobile Logo (visible only on small screens) */}
                <div className="mb-8 flex items-center gap-2 lg:hidden">
                    <Leaf className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-white">Ayurgrid</span>
                </div>

                <div className="w-full max-w-[480px]">
                    {/* Header */}
                    <div className="mb-10 text-left">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">Welcome Back</h1>
                        <p className="text-base text-gray-400">Access your practice management dashboard.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Error Display */}
                        {error && (
                            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                                <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                {error}
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="email">Email Address or User ID</label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-full border border-gray-700 bg-surface-dark px-6 py-4 text-white placeholder-gray-500 shadow-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-6 pr-12"
                                    id="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1 ml-4">{errors.email.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    className="w-full rounded-full border border-gray-700 bg-surface-dark px-6 py-4 text-white placeholder-gray-500 shadow-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-6 pr-12"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer hover:text-white group"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                                    )}
                                </div>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1 ml-4">{errors.password.message}</p>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link className="text-sm font-medium text-primary hover:text-primary-hover hover:underline decoration-2 underline-offset-4 transition-all" href="/auth/recovery">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-2">
                            <button
                                className="flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-primary/30 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login securely"
                                )}
                            </button>

                            <div className="relative flex items-center justify-center py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-800"></div>
                                </div>
                                <span className="relative bg-background-dark px-4 text-sm text-gray-500">or</span>
                            </div>

                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-700 bg-transparent px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-background-dark"
                                type="button"
                                onClick={() => router.push("/auth/verify")}
                            >
                                <MessageSquare className="h-5 w-5" />
                                Login with OTP instead
                            </button>
                        </div>
                    </form>

                    {/* Footer CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400">
                            New to Ayurgrid?
                            <a className="ml-1 font-semibold text-primary hover:text-primary-hover hover:underline decoration-2 underline-offset-4 transition-all" href="#">Register Your Practice</a>
                        </p>
                    </div>

                    {/* Security Badges */}
                    <div className="mt-12 flex justify-center gap-6 opacity-30 grayscale hover:opacity-50 hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-1">
                            <Lock className="h-4 w-4" />
                            <span className="text-[10px] font-semibold tracking-wider uppercase">HIPAA Compliant</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-[10px] font-semibold tracking-wider uppercase">End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
