'use client'

import { useActionState, useState } from "react";
import Link from "next/link";
import { signup, SignupState } from "./actions"; // Adjust import path if needed
import { Leaf, Quote, Mail, Eye, EyeOff, Lock, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(signup, {} as SignupState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark text-white font-sans selection:bg-primary selection:text-white">
            {/* Left Brand Panel (40%) - Same as Login for consistency */}
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

                {/* Testimonial/Info Card */}
                <div className="glass-panel animate-float relative z-10 mx-auto w-full max-w-md rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6 text-primary">
                        <Quote className="h-8 w-8 fill-current" />
                    </div>
                    <blockquote className="mb-6 text-xl font-medium leading-relaxed text-white/90">
                        &quot;Join the network of modern Ayurvedic practitioners using data to enhance patient care and streamline operations.&quot;
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/30 relative bg-primary/20 flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-white">Join 500+ Clinics</p>
                            <p className="text-sm text-gray-300">Digitizing Ayurveda</p>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="relative z-10 text-xs text-white/40">
                    © 2024 Ayurgrid Health Technologies. All rights reserved.
                </div>
            </div>

            {/* Right Registration Panel (60%) */}
            <div className="flex flex-1 flex-col items-center justify-center bg-background-dark px-6 py-12 sm:px-12 xl:px-24">
                {/* Mobile Logo */}
                <div className="mb-8 flex items-center gap-2 lg:hidden">
                    <Leaf className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-white">Ayurgrid</span>
                </div>

                <div className="w-full max-w-[480px]">
                    {/* Header */}
                    <div className="mb-10 text-left">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">Create Account</h1>
                        <p className="text-base text-gray-400">Start your digital practice journey today.</p>
                    </div>

                    {/* Register Form */}
                    <form action={formAction} className="space-y-6">

                        {/* Global Error */}
                        {state.error && (
                            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                                <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                {state.error}
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-full border border-gray-700 bg-surface-dark px-6 py-4 text-white placeholder-gray-500 shadow-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-6 pr-12"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="doctor@example.com"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                            </div>
                            {state.fieldErrors?.email && <p className="text-red-400 text-xs mt-1 ml-4">{state.fieldErrors.email[0]}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-full border border-gray-700 bg-surface-dark px-6 py-4 text-white placeholder-gray-500 shadow-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-6 pr-12"
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    required
                                    minLength={6}
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
                            {state.fieldErrors?.password && <p className="text-red-400 text-xs mt-1 ml-4">{state.fieldErrors.password[0]}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-full border border-gray-700 bg-surface-dark px-6 py-4 text-white placeholder-gray-500 shadow-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-6 pr-12"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    required
                                    minLength={6}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer hover:text-white group"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                                    )}
                                </div>
                            </div>
                            {state.fieldErrors?.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-4">{state.fieldErrors.confirmPassword[0]}</p>}
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-2">
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-primary/30 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Get Started <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400">
                            Already have an account?
                            <Link className="ml-1 font-semibold text-primary hover:text-primary-hover hover:underline decoration-2 underline-offset-4 transition-all" href="/login">Login Here</Link>
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
