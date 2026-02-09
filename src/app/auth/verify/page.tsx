'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Timer, Lock, Leaf, Loader2 } from 'lucide-react'
import { verifyOtp } from './actions'

function VerifyForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    // Default to a placeholder if not provided, for visual fidelity testing
    const email = searchParams.get('email') || 'user@example.com'

    // Form State
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [timeLeft, setTimeLeft] = useState(45)

    const inputs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        // Auto-focus first input
        inputs.current[0]?.focus()

        // Timer countdown
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return // Only allow numbers

        const newOtp = [...otp]
        // Take only the last character if multiple typed (though maxlength is 1)
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        // Auto focus next
        if (value && index < 5) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputs.current[index - 1]?.focus()
        }
        if (e.key === 'ArrowRight' && index < 5) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return

        const nums = pastedData.split('')
        const newOtp = [...otp]
        nums.forEach((n, i) => {
            if (i < 6) newOtp[i] = n
        })
        setOtp(newOtp)
        inputs.current[Math.min(nums.length, 5)]?.focus()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const code = otp.join('')
        if (code.length !== 6) {
            setError("Please enter a complete 6-digit code")
            setLoading(false)
            return
        }

        try {
            const result = await verifyOtp({ email, token: code })
            if (result?.error) {
                setError(result.error)
            } else if (result?.success) {
                router.push('/dashboard')
            }
        } catch (err) {
            console.error(err)
            setError("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (s: number) => {
        const min = Math.floor(s / 60).toString().padStart(2, '0')
        const sec = (s % 60).toString().padStart(2, '0')
        return `${min}:${sec}`
    }

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden font-display">
            {/* Left Panel: Brand & Mood */}
            <div className="hidden lg:flex lg:w-[40%] flex-col relative bg-[#141e15] overflow-hidden">
                {/* Mesh Gradient Background */}
                <div
                    className="absolute inset-0 w-full h-full opacity-60 bg-mesh-verify"
                ></div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
                    <div className="flex items-center gap-2 opacity-80">
                        <Leaf className="text-3xl" />
                        <span className="text-lg font-semibold tracking-wide uppercase">Ayurgrid</span>
                    </div>

                    <div className="flex flex-col gap-6 mb-12">
                        <ShieldCheck className="text-5xl text-primary" />
                        <blockquote className="text-4xl font-bold leading-tight tracking-tight">
                            &quot;Precision in Care, <br /> rooted in nature.&quot;
                        </blockquote>
                        <p className="text-white/60 max-w-sm text-lg font-light">
                            Securely accessing the future of Ayurvedic practice management.
                        </p>
                    </div>

                    <div className="text-sm text-white/40 font-mono">
                        System Status: Operational
                    </div>
                </div>

                {/* Image/Pattern for context */}
                <div className="absolute inset-0 mix-blend-overlay opacity-20 relative">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi9cvsXmLN9PUexvIbNam-81S3M-5hzFHCS_hVSTZ66Im1Byjc9mOZZKtMJ7gjYwxw_woGK9sCV9gzWELADkKxwaO7kkvEs8-6v4kwnSNcT-ifib5FSTefqFaF_qWsbcE-jI07ouUXFwrhh-6eOVm2aNjvAXG3sfTVc5ZVc3UbxScoqZbyhCTc4GY7ggXGPQsIWc_4AWHvQtNLSCgBVkHEiUq2mFF-XZRStmHWseF8J7LRVvgNtoB8Wqvt1j_1lqmdJr6Uf9tnfqM"
                        alt="Abstract herbal leaf textures"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>

            {/* Right Panel: Verification Form */}
            <div className="flex w-full lg:w-[60%] flex-col items-center justify-center bg-surface-light p-6 md:p-12 relative bg-[#ffffff]">
                <div className="w-full max-w-[480px] flex flex-col gap-8">

                    {/* Logo & Header */}
                    <div className="flex flex-col gap-6 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-2">
                            <Leaf className="h-10 w-10" />
                            <span className="text-2xl font-bold tracking-tight text-[#111811]">Ayurgrid</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#111811] tracking-tight mb-2">Secure Verification</h1>
                            <p className="text-gray-500 text-base">
                                We&apos;ve sent a 6-digit code to <span className="font-semibold text-gray-900">{email}</span>
                            </p>
                            <Link href="/login" className="mt-2 text-primary hover:text-primary-dark text-sm font-medium hover:underline transition-colors block">
                                Change Email Address
                            </Link>
                        </div>
                    </div>

                    {/* OTP Inputs */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <fieldset className="flex gap-3 justify-center lg:justify-start">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputs.current[index] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="flex h-14 w-12 sm:h-16 sm:w-14 text-center rounded-lg border border-gray-200 bg-gray-50 text-2xl font-mono text-gray-900 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-gray-300"
                                    autoComplete="one-time-code"
                                    aria-label={`Digit ${index + 1}`}
                                />
                            ))}
                        </fieldset>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Timer & Resend */}
                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Timer className="text-lg" />
                                <span>Resend code in <span className="font-mono font-medium text-gray-900">{formatTime(timeLeft)}</span></span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading || otp.join('').length !== 6}
                                className="flex w-full cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-primary-dark h-14 px-5 text-white text-lg font-semibold tracking-wide transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify & Login"}
                            </button>

                            <button
                                type="button"
                                disabled={timeLeft > 0}
                                className={`text-sm font-medium transition-colors ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:underline cursor-pointer'}`}
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                </div>

                {/* Minimalist Footer */}
                <div className="absolute bottom-6 left-0 w-full flex justify-center">
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                        <Lock className="h-3 w-3" />
                        <span>AES-256 Encrypted Session</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function VerificationPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <VerifyForm />
        </Suspense>
    )
}
