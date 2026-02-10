'use client'

import { useActionState, useState } from 'react'
import { saveLocationInfrastructure, LocationInfrastructureState } from './actions'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function LocationInfrastructurePage() {
    const [state, formAction, isPending] = useActionState(saveLocationInfrastructure, {} as LocationInfrastructureState)
    const [isMultiBranch, setIsMultiBranch] = useState(false)
    const [hasIPD, setHasIPD] = useState(false)

    // Counters for rooms
    const [consultationRooms, setConsultationRooms] = useState(1)
    const [therapyRooms, setTherapyRooms] = useState(0)
    const [ipdBeds, setIpdBeds] = useState(0)

    return (
        <div className="bg-white dark:bg-[#1a261c] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12 relative overflow-hidden">
            {/* Decorator */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Location & Infrastructure</h1>
                <p className="text-gray-500 dark:text-gray-400">Establish your hospital's physical presence and capacity limits.</p>
            </div>

            <form action={formAction} className="space-y-12">

                {/* Global Error */}
                {state.error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {state.error}
                    </div>
                )}

                {/* Section A: Location Details */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">location_on</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Registered Address <span className="text-red-500">*</span></label>
                            <textarea
                                name="address"
                                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-gray-900 dark:text-white placeholder-gray-400 px-4 py-3 resize-none"
                                placeholder="Enter complete street address"
                                rows={3}
                                required
                            ></textarea>
                            {state.fieldErrors?.address && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.address[0]}</p>}
                        </div>
                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">apartment</span>
                                <input
                                    name="city"
                                    className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent pl-11 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400"
                                    placeholder="e.g. Kerala"
                                    type="text"
                                    required
                                />
                            </div>
                            {state.fieldErrors?.city && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.city[0]}</p>}
                        </div>
                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">map</span>
                                <input
                                    name="state"
                                    className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent pl-11 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400"
                                    placeholder="e.g. Cochin"
                                    type="text"
                                    required
                                />
                            </div>
                            {state.fieldErrors?.state && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.state[0]}</p>}
                        </div>
                        {/* PIN Code */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PIN Code <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">pin_drop</span>
                                <input
                                    name="pincode"
                                    className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent pl-11 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400"
                                    pattern="[0-9]*"
                                    placeholder="000000"
                                    type="text"
                                    required
                                />
                            </div>
                            {state.fieldErrors?.pincode && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.pincode[0]}</p>}
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100 dark:border-gray-800" />

                {/* Section B: Branch Configuration */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">domain</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Multi-Branch Support</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Enable if this entity manages multiple locations</p>
                            </div>
                        </div>
                        {/* Toggle Switch */}
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="is_multi_branch"
                                id="toggle-branch"
                                className="hidden"
                                checked={isMultiBranch}
                                onChange={() => setIsMultiBranch(!isMultiBranch)}
                            />
                            <label
                                htmlFor="toggle-branch"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${isMultiBranch ? 'bg-primary' : 'bg-gray-200'}`}
                            >
                                <span className={`block w-6 h-6 rounded-full bg-white border-4 border-gray-200 shadow-sm transform transition-transform duration-300 ${isMultiBranch ? 'translate-x-6 border-primary' : 'translate-x-0'}`}></span>
                            </label>
                        </div>
                    </div>

                    {/* Collapsible Branch Details */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14 transition-all duration-300 overflow-hidden ${isMultiBranch ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Branch Name</label>
                            <input
                                name="branch_name"
                                disabled={!isMultiBranch}
                                className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent px-5 py-3 text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="Main Hospital Block"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch Code</label>
                            <input
                                name="branch_code"
                                disabled={!isMultiBranch}
                                className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent px-5 py-3 text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="BLK-01"
                                type="text"
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100 dark:border-gray-800" />

                {/* Section C: Infrastructure & Capacity */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">meeting_room</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Capacity Setup</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                        {/* Consultation Rooms Stepper */}
                        <div className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
                            <div className="mb-4">
                                <label className="text-base font-semibold text-gray-900 dark:text-white block">Consultation Rooms</label>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Total active doctor cabins</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-full p-1.5 border border-gray-200 dark:border-gray-700 w-fit">
                                <button
                                    type="button"
                                    onClick={() => setConsultationRooms(Math.max(0, consultationRooms - 1))}
                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">remove</span>
                                </button>
                                <span className="font-bold text-lg w-6 text-center text-gray-900 dark:text-white">{consultationRooms}</span>
                                <input type="hidden" name="consultation_rooms" value={consultationRooms} />
                                <button
                                    type="button"
                                    onClick={() => setConsultationRooms(consultationRooms + 1)}
                                    className="w-8 h-8 rounded-full bg-primary text-white hover:bg-primary-dark flex items-center justify-center shadow-md transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Therapy Rooms Stepper */}
                        <div className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
                            <div className="mb-4">
                                <label className="text-base font-semibold text-gray-900 dark:text-white block">Therapy Rooms</label>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Panchkarma / Treatment areas</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-full p-1.5 border border-gray-200 dark:border-gray-700 w-fit">
                                <button
                                    type="button"
                                    onClick={() => setTherapyRooms(Math.max(0, therapyRooms - 1))}
                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">remove</span>
                                </button>
                                <span className="font-bold text-lg w-6 text-center text-gray-900 dark:text-white">{therapyRooms}</span>
                                <input type="hidden" name="therapy_rooms" value={therapyRooms} />
                                <button
                                    type="button"
                                    onClick={() => setTherapyRooms(therapyRooms + 1)}
                                    className="w-8 h-8 rounded-full bg-primary text-white hover:bg-primary-dark flex items-center justify-center shadow-md transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* IPD Toggle Section */}
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10 dark:border-primary/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-background-dark text-primary flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined">bed</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">In-Patient Department (IPD)</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Enable Hospital Admission Facility</p>
                                </div>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    name="has_ipd"
                                    id="toggle-ipd"
                                    className="hidden"
                                    checked={hasIPD}
                                    onChange={() => setHasIPD(!hasIPD)}
                                />
                                <label
                                    htmlFor="toggle-ipd"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${hasIPD ? 'bg-primary' : 'bg-gray-200'}`}
                                >
                                    <span className={`block w-6 h-6 rounded-full bg-white border-4 border-gray-200 shadow-sm transform transition-transform duration-300 ${hasIPD ? 'translate-x-6 border-primary' : 'translate-x-0'}`}></span>
                                </label>
                            </div>
                        </div>

                        {/* Collapsible IPD Details */}
                        <div className={`transition-all duration-300 overflow-hidden ${hasIPD ? 'max-h-[500px] opacity-100 mt-4 pt-6 border-t border-primary/10 dark:border-primary/20' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-6">
                                {/* Bed Count */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <label className="text-base font-medium text-gray-900 dark:text-white">Total IPD Beds Capacity</label>
                                    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-full p-1.5 border border-gray-200 dark:border-gray-700 w-fit shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setIpdBeds(Math.max(0, ipdBeds - 1))}
                                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">remove</span>
                                        </button>
                                        <span className="font-bold text-lg w-8 text-center text-gray-900 dark:text-white">{ipdBeds}</span>
                                        <input type="hidden" name="ipd_beds" value={ipdBeds} />
                                        <button
                                            type="button"
                                            onClick={() => setIpdBeds(ipdBeds + 1)}
                                            className="w-8 h-8 rounded-full bg-primary text-white hover:bg-primary-dark flex items-center justify-center shadow-md transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">add</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Bed Categories */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Bed Categories Available</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['General', 'Semi-Private', 'Private', 'Deluxe'].map((type) => (
                                            <label key={type} className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary/50 transition-colors">
                                                <input type="checkbox" name="bed_categories" value={type} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-6 mt-6">
                    <Link href="/onboarding/identity" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors px-2 py-2 font-medium">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Step 1
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : 'Save & Continue'}
                        {!isPending && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
                    </button>
                </div>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6 pb-6">
                © 2024 Ayurgrid Solutions. Secure & Encrypted Connection.
            </p>
        </div>
    )
}
