'use client'

import { useActionState, useEffect, useState } from 'react'
import { sendRecoveryCode, resetPassword, RecoveryState } from './actions'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ShieldCheck, Lock, LockKeyhole, Eye, EyeOff, CheckCircle } from 'lucide-react'

const initialState: RecoveryState = {}

export default function RecoveryPage() {
    const [sendState, sendAction, isSendPending] = useActionState(sendRecoveryCode, initialState)
    const [resetState, resetAction, isResetPending] = useActionState(resetPassword, initialState)

    const [step, setStep] = useState<1 | 2>(1)
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Code input state (6 digits)
    const [code, setCode] = useState(['', '', '', '', '', ''])

    useEffect(() => {
        if (sendState.step === 'code_sent') {
            // Use setTimeout to avoid synchronous state update warning
            setTimeout(() => setStep(2), 0)
        }
    }, [sendState.step])

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            prevInput?.focus()
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-row font-sans text-[#111811]">
            {/* Left Panel: Brand & Quote (40%) */}
            <div className="hidden lg:flex lg:w-[40%] flex-col relative bg-[#141e15] overflow-hidden text-white">
                {/* Background Image/Gradient Overlay */}
                <div
                    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3')]"
                ></div>
                <div
                    className="absolute inset-0 w-full h-full opacity-60 bg-mesh-verify"
                ></div>

                <div className="relative z-20 flex flex-col h-full justify-between p-12">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">🌿</span>
                        <span className="text-2xl font-bold tracking-wide font-heading">Ayurgrid</span>
                    </div>
                    {/* Quote */}
                    <div className="flex flex-col gap-6 max-w-lg">
                        <span className="text-6xl opacity-50 font-serif">&ldquo;</span>
                        <blockquote className="text-3xl font-medium leading-tight italic font-heading">
                            &ldquo;The physician who fails to enter the body of the patient with the lamp of knowledge and understanding can never treat diseases.&rdquo;
                        </blockquote>
                        <cite className="text-lg opacity-80 not-italic font-sans tracking-wide">&mdash; Charaka Samhita</cite>
                    </div>
                    {/* Compliance Badges */}
                    <div className="flex flex-wrap gap-6 items-center opacity-70">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-sm font-medium">HIPAA Compliant</span>
                        </div>
                        <div className="h-4 w-px bg-white/40"></div>
                        <div className="flex items-center gap-2">
                            <LockKeyhole className="w-5 h-5" />
                            <span className="text-sm font-medium">ISO 27001</span>
                        </div>
                        <div className="h-4 w-px bg-white/40"></div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            <span className="text-sm font-medium">256-bit SSL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Functional Form (60%) */}
            <div className="flex-1 w-full lg:w-[60%] bg-[#f6f8f6] dark:bg-[#141e15]/90 flex flex-col overflow-y-auto">
                {/* Top Navigation */}
                <div className="w-full p-6 flex justify-end">
                    <Link href="#" className="text-[#5e8761] hover:text-[#2f7f34] flex items-center gap-2 text-sm font-medium transition-colors">
                        <span className="text-lg">?</span>
                        Need Help?
                    </Link>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-12 md:px-24 xl:px-32 py-8">
                    <div className="w-full max-w-[560px] flex flex-col gap-8 transition-all duration-500 ease-in-out">

                        {/* State 1: Request Access */}
                        {step === 1 && (
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading text-foreground">Restore Access</h1>
                                    <p className="text-[#5e8761] text-lg leading-relaxed">Enter your registered email credentials to receive a secure recovery code.</p>
                                </div>

                                <form action={sendAction} className="flex flex-col gap-6 mt-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-foreground font-semibold text-lg" htmlFor="email">Registered Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-[#5e8761] group-focus-within:text-[#2f7f34] transition-colors">✉️</span>
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="dr.sharma@ayurgrid.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full h-14 pl-12 pr-4 rounded-xl border border-[#d5e2d6] bg-white text-gray-900 placeholder:text-[#5e8761]/50 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] focus:outline-none transition-all text-lg font-sans"
                                            />
                                        </div>
                                    </div>

                                    {sendState.error && (
                                        <p className="text-red-500 text-sm font-medium">{sendState.error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSendPending}
                                        className="h-14 w-full bg-[#2f7f34] hover:bg-[#1b4d1e] text-white rounded-full font-bold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                                    >
                                        {isSendPending ? 'Sending...' : 'Send Verification Code'}
                                        {!isSendPending && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </form>

                                <div className="flex justify-center mt-2">
                                    <Link href="/login" className="text-[#5e8761] hover:text-[#2f7f34] underline underline-offset-4 text-base font-medium transition-colors">
                                        Return to Login
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* State 2: Verify & Reset */}
                        {step === 2 && (
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="self-start text-[#5e8761] hover:text-[#2f7f34] flex items-center gap-1 text-sm font-medium mb-2 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to options
                                    </button>
                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading text-foreground">Secure Reset</h1>
                                    <p className="text-[#5e8761] text-lg leading-relaxed">We&apos;ve sent a 6-digit code to <strong>{email}</strong>. Please enter it below to reset your password.</p>
                                </div>

                                <form action={resetAction} className="flex flex-col gap-6 mt-2">
                                    <input type="hidden" name="email" value={email} />

                                    {/* OTP Input */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-foreground font-semibold text-lg">Verification Code</label>
                                        <div className="flex gap-2 sm:gap-4 justify-between">
                                            {code.map((digit, idx) => (
                                                <input
                                                    key={idx}
                                                    id={`code-${idx}`}
                                                    aria-label={`Digit ${idx + 1}`}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                                    className="w-12 h-14 sm:w-16 sm:h-16 text-center text-2xl font-mono border border-[#d5e2d6] rounded-lg bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] focus:outline-none transition-all"
                                                />
                                            ))}
                                        </div>
                                        {/* Hidden input to submit the full code */}
                                        <input type="hidden" name="code" value={code.join('')} />
                                    </div>

                                    <hr className="border-[#d5e2d6]/50 my-2" />

                                    {/* Password Fields */}
                                    <div className="grid gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-foreground font-semibold text-lg" htmlFor="password">New Password</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Lock className="w-5 h-5 text-[#5e8761] group-focus-within:text-[#2f7f34] transition-colors" />
                                                </div>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-[#d5e2d6] bg-white text-gray-900 placeholder:text-[#5e8761]/50 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] focus:outline-none transition-all text-lg font-sans"
                                                    placeholder="••••••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#5e8761] hover:text-[#2f7f34] focus:outline-none"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-foreground font-semibold text-lg" htmlFor="confirmPassword">Confirm New Password</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Lock className="w-5 h-5 text-[#5e8761] group-focus-within:text-[#2f7f34] transition-colors" />
                                                </div>
                                                <input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    required
                                                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-[#d5e2d6] bg-white text-gray-900 placeholder:text-[#5e8761]/50 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] focus:outline-none transition-all text-lg font-sans"
                                                    placeholder="••••••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#5e8761] hover:text-[#2f7f34] focus:outline-none"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {resetState.error && (
                                        <p className="text-red-500 text-sm font-medium">{resetState.error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isResetPending}
                                        className="h-14 w-full bg-[#2f7f34] hover:bg-[#1b4d1e] text-white rounded-full font-bold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 group disabled:opacity-70"
                                    >
                                        {isResetPending ? 'Updating...' : 'Update Password'}
                                        {!isResetPending && <CheckCircle className="w-5 h-5" />}
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 text-center">
                    <p className="text-xs text-[#5e8761] font-sans">© 2024 Ayurgrid Hospital Systems. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
