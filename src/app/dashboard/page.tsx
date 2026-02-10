import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        redirect('/login')
    }

    let hospital = null;
    try {
        const { data, error: hospitalError } = await supabase
            .from('hospitals')
            .select('name')
            .eq('admin_id', user.id)
            .single()

        if (hospitalError && hospitalError.code !== 'PGRST116') {
            console.error("Dashboard Load Error:", hospitalError);
        }
        hospital = data;
    } catch (e) {
        console.error("Unexpected Dashboard Data Error:", e);
    }

    if (!hospital) {
        redirect('/onboarding/identity')
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-24 bg-gray-50 text-gray-900">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold font-serif text-[#2f7f34]">Ayurgrid Dashboard</h1>
                <p className="text-xl">Welcome, {user.email}</p>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
                    <h2 className="text-lg font-semibold mb-2">My Clinic</h2>
                    <p className="text-2xl font-bold font-display">{hospital.name}</p>
                </div>
            </div>
        </div>
    )
}
