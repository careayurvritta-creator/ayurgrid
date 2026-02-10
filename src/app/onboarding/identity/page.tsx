'use client'

import { useActionState, useState, useEffect } from 'react'
import { saveClinicIdentity, IdentityState } from './actions'
import {
    Stethoscope, MapPin, Package, ShieldCheck,
    Building2, Smartphone, Mail, ArrowRight,
    Upload, Info, CheckCircle2, AlertCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const initialState: IdentityState = {}

export default function ClinicIdentityPage() {
    const [state, formAction, isPending] = useActionState(saveClinicIdentity, initialState)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    // Handle Logo Preview
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB')
                e.target.value = '' // Reset input
                return
            }
            const objectUrl = URL.createObjectURL(file)
            setLogoPreview(objectUrl)
        }
    }

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (logoPreview) URL.revokeObjectURL(logoPreview)
        }
    }, [logoPreview])

    return (
        <div className="min-h-screen bg-[#fafbfc] font-display text-gray-900 flex flex-col">

            {/* Header */}
            <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#2f7f34]/10 p-2 rounded-lg text-[#2f7f34]">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">Ayurgrid</span>
                    </div>
                    <div className="text-sm text-gray-500 hidden sm:block">
                        Operational Onboarding
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* Progress Stepper */}
                <div className="mb-12 max-w-5xl mx-auto">
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full -z-10"></div>
                        <div className="absolute top-1/2 left-0 w-[12%] h-1 bg-[#2f7f34] -translate-y-1/2 rounded-full -z-10 transition-all duration-500"></div>
                        <div className="flex justify-between w-full">
                            {/* Step 1 (Active) */}
                            <div className="flex flex-col items-center gap-2 group cursor-default">
                                <div className="w-10 h-10 rounded-full bg-[#2f7f34] text-white flex items-center justify-center shadow-lg shadow-[#2f7f34]/30 ring-4 ring-white transition-all">
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold text-[#2f7f34] mt-1 hidden sm:block">Clinic Identity</span>
                            </div>
                            {/* Step 2 */}
                            <div className="flex flex-col items-center gap-2 group cursor-default">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center ring-4 ring-white">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-medium text-gray-400 mt-1 hidden sm:block">Location</span>
                            </div>
                            {/* Step 3 */}
                            <div className="flex flex-col items-center gap-2 group cursor-default">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center ring-4 ring-white">
                                    <Package className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-medium text-gray-400 mt-1 hidden sm:block">Operations</span>
                            </div>
                            {/* Step 4 */}
                            <div className="flex flex-col items-center gap-2 group cursor-default">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center ring-4 ring-white">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-medium text-gray-400 mt-1 hidden sm:block">Verification</span>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Step Indicator */}
                    <div className="sm:hidden text-center mt-6">
                        <p className="text-[#2f7f34] font-semibold text-sm">Step 1 of 4: Clinic Identity</p>
                    </div>
                </div>

                {/* Main Card */}
                <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="px-8 pt-10 pb-6 border-b border-gray-100 bg-white">
                        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-2">Clinic Identity & Legal Ownership</h1>
                        <p className="text-gray-500 text-base">Please provide the official registration details of your establishment.</p>

                        {/* Global Error Handle */}
                        {state.error && (
                            <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 flex items-start gap-3 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{state.error}</span>
                            </div>
                        )}
                    </div>

                    {/* Form Body */}
                    <form action={formAction} className="flex flex-col">
                        <div className="p-8 md:p-10 space-y-10">

                            {/* Section: Logo Upload (New) */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#2f7f34]/10 flex items-center justify-center text-[#2f7f34] shrink-0">
                                        <Upload className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Clinic Logo</h2>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0 relative">
                                        {logoPreview ? (
                                            <Image
                                                src={logoPreview}
                                                alt="Logo Preview"
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400 text-center px-2">No Logo</span>
                                        )}
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                                            Upload Valid Logo <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                                        </label>
                                        <input
                                            type="file"
                                            id="logo"
                                            name="logo"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-[#2f7f34]/10 file:text-[#2f7f34]
                                                hover:file:bg-[#2f7f34]/20
                                                transition-all"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Max 2MB. formats: JPG, PNG, WEBP.</p>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-200 border-dashed" />

                            {/* Section A: Establishment Identity */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#2f7f34]/10 flex items-center justify-center text-[#2f7f34] shrink-0">
                                        <Building2 className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Establishment Identity</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="clinic_name">
                                            Registered Name of Clinic/Hospital/Center <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="clinic_name"
                                            id="clinic_name"
                                            type="text"
                                            placeholder="e.g. AyurLife Wellness Center"
                                            className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] placeholder:text-gray-400 transition-colors"
                                        />
                                        {state.fieldErrors?.name && <p className="text-red-500 text-xs">{state.fieldErrors.name[0]}</p>}
                                    </div>
                                    {/* Type Select */}
                                    <div className="col-span-1 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="clinic_type">
                                            Type of Establishment <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="clinic_type"
                                            id="clinic_type"
                                            defaultValue=""
                                            className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] transition-colors"
                                        >
                                            <option value="" disabled>Select type</option>
                                            <option value="opd">OPD Clinic</option>
                                            <option value="panchkarma">Panchkarma Center</option>
                                            <option value="hospital">Ayurvedic Hospital</option>
                                            <option value="wellness">Wellness Resort</option>
                                        </select>
                                        {state.fieldErrors?.type && <p className="text-red-500 text-xs">{state.fieldErrors.type[0]}</p>}
                                    </div>
                                    {/* Reg Number Input */}
                                    <div className="col-span-1 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="reg_number">
                                            Registration Number <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                                        </label>
                                        <input
                                            name="reg_number"
                                            id="reg_number"
                                            type="text"
                                            placeholder="e.g. REG-2024-XXXX"
                                            className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] placeholder:text-gray-400 transition-colors"
                                        />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-200 border-dashed" />

                            {/* Section B: Primary Responsible Doctor */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#2f7f34]/10 flex items-center justify-center text-[#2f7f34] shrink-0">
                                        <Stethoscope className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Primary Responsible Doctor</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Doctor Name */}
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="doctor_name">
                                            Primary Doctor / Medical Director Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Dr.</span>
                                            <input
                                                name="doctor_name"
                                                id="doctor_name"
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] placeholder:text-gray-400 transition-colors"
                                            />
                                        </div>
                                        {state.fieldErrors?.doctor_name && <p className="text-red-500 text-xs">{state.fieldErrors.doctor_name[0]}</p>}
                                    </div>
                                    {/* Doctor Reg Number */}
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="doc_reg_number">
                                            Medical Registration Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                name="doc_reg_number"
                                                id="doc_reg_number"
                                                type="text"
                                                placeholder="e.g. MCI/12345/2020"
                                                className="flex-1 h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] placeholder:text-gray-400 transition-colors"
                                            />
                                            {/* Dummy Verify Button - Logic not implemented yet */}
                                            <button
                                                type="button"
                                                className="h-12 px-6 rounded-xl border-2 border-[#2f7f34]/20 text-[#2f7f34] font-medium hover:bg-[#2f7f34] hover:text-white hover:border-[#2f7f34] transition-all flex items-center justify-center gap-2 whitespace-nowrap group"
                                            >
                                                <CheckCircle2 className="w-5 h-5 group-hover:animate-pulse" />
                                                Verify Registration
                                            </button>
                                        </div>
                                        {state.fieldErrors?.doctor_reg_number && <p className="text-red-500 text-xs">{state.fieldErrors.doctor_reg_number[0]}</p>}
                                        <p className="text-xs text-[#5e8761] flex items-start gap-1.5 mt-2">
                                            <Info className="w-4 h-4 shrink-0 relative top-[1px]" />
                                            Accurate registration details are required for medico-legal validity of prescriptions.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-200 border-dashed" />

                            {/* Section C: Admin Contact */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#2f7f34]/10 flex items-center justify-center text-[#2f7f34] shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Admin Contact</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Mobile Number */}
                                    <div className="col-span-1 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="mobile">
                                            Official Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex">
                                            <div className="h-12 px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl flex items-center text-gray-500 font-medium">
                                                +91
                                            </div>
                                            <input
                                                name="mobile"
                                                id="mobile"
                                                type="tel"
                                                placeholder="98765 43210"
                                                className="flex-1 h-12 px-4 rounded-r-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] placeholder:text-gray-400 transition-colors"
                                            />
                                        </div>
                                        {state.fieldErrors?.mobile && <p className="text-red-500 text-xs">{state.fieldErrors.mobile[0]}</p>}
                                    </div>
                                    {/* Email ID */}
                                    <div className="col-span-1 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                            Official Email ID <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            // Note: In a real app we might want to prefill this from user session, but checking auth is async
                                            placeholder="admin@clinic.com"
                                            className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#2f7f34] focus:ring-[#2f7f34] placeholder:text-gray-400 transition-colors"
                                        />
                                        {state.fieldErrors?.email && <p className="text-red-500 text-xs">{state.fieldErrors.email[0]}</p>}
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Footer / Actions */}
                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Legal Checkbox */}
                            <div className="flex items-start gap-3 w-full md:w-auto md:max-w-md">
                                <div className="flex h-6 items-center">
                                    <input
                                        name="legal_confirmation"
                                        id="legal_confirmation"
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-gray-300 text-[#2f7f34] focus:ring-[#2f7f34] cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-gray-600 leading-snug cursor-pointer select-none" htmlFor="legal_confirmation">
                                        I certify that I am the legal owner or authorized administrator for this establishment and the information provided is accurate.
                                    </label>
                                    {state.fieldErrors?.legal_confirmation && <p className="text-red-500 text-xs">{state.fieldErrors.legal_confirmation[0]}</p>}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                    Back to Login
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="h-12 px-8 rounded-full bg-[#2f7f34] text-white font-medium shadow-lg shadow-[#2f7f34]/20 hover:bg-[#1b5e20] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isPending ? 'Saving...' : 'Save & Continue'}
                                    {!isPending && <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    © 2024 Ayurgrid Solutions. All rights reserved. <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>
                </div>

            </main>
        </div>
    )
}
