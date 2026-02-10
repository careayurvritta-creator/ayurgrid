'use client'

import { useActionState, useState } from 'react'
import { changePassword, skipSecurityStep, continueToNextStep, SecurityState } from './actions'
import Link from 'next/link'
import { Loader2, ShieldCheck, Lock, KeyRound, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react'

export default function AccountSecurityPage() {
    const [state, formAction, isPending] = useActionState(changePassword, {} as SecurityState)
    const [isSkipping, setIsSkipping] = useState(false)

    // Handler for Skip button to show loading state
    const handleSkip = async () => {
        setIsSkipping(true)
        await skipSecurityStep()
    }

    // Handler for Continue button (after success)
    const handleContinue = async () => {
        await continueToNextStep()
    }

    return (
        <div className="bg-white dark:bg-[#1a261c] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12 relative overflow-hidden">
            {/* Decorator */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Account Security</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Protect your clinic's data by securing your administrator account.
                </p>
            </div>

            {/* Success State */}
            {state.success ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-300">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Updated!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Your account is now more secure. You can proceed to the next step.
                    </p>
                    <button
                        onClick={handleContinue}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        Continue to Next Step
                        <ChevronRight size={20} />
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Actions */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Error Message */}
                        {state.error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-3">
                                <AlertTriangle size={20} />
                                {state.error}
                            </div>
                        )}

                        <form action={formAction} className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Lock size={20} className="text-gray-400" />
                                    Change Password
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent pl-10 pr-4 py-2.5 transition-all"
                                            />
                                            <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {state.fieldErrors?.password && (
                                            <p className="text-red-500 text-xs mt-1">{state.fieldErrors.password[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="confirm_password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent pl-10 pr-4 py-2.5 transition-all"
                                            />
                                            <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {state.fieldErrors?.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">{state.fieldErrors.confirmPassword[0]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button
                                    type="submit"
                                    disabled={isPending || isSkipping}
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50"
                                >
                                    {isPending ? <Loader2 className="animate-spin" size={20} /> : 'Update Password'}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSkip}
                                    disabled={isPending || isSkipping}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {isSkipping ? 'Skipping...' : 'Skip for now'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Information/2FA Teaser */}
                    <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                            <h4 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">Why secure your account?</h4>
                            <p className="text-sm text-blue-800 dark:text-blue-200/80 leading-relaxed">
                                As a healthcare provider, you handle sensitive patient data. Ensuring a strong password is the first line of defense against unauthorized access.
                            </p>
                        </div>

                        <div className="opacity-60 pointer-events-none grayscale">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Two-Factor Authentication</h4>
                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Coming Soon</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    Add an extra layer of security by requiring a code from your phone when logging in.
                                </p>
                                <button className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-lg text-sm font-medium">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
