'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// Define the state type for form feedback
export type LocationInfrastructureState = {
    error?: string
    fieldErrors?: Record<string, string[]>
    success?: boolean
}

// Validation Schema
const locationInfrastructureSchema = z.object({
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().regex(/^\d{6}$/, 'Valid 6-digit PIN code is required'),

    is_multi_branch: z.boolean().default(false),
    branch_name: z.string().optional(),
    branch_code: z.string().optional(),

    consultation_rooms: z.coerce.number().min(0).default(0),
    therapy_rooms: z.coerce.number().min(0).default(0),

    has_ipd: z.boolean().default(false),
    ipd_beds: z.coerce.number().min(0).default(0),
    bed_categories: z.array(z.string()).default([])
}).refine((data) => {
    if (data.is_multi_branch) {
        return !!data.branch_name && !!data.branch_code
    }
    return true
}, {
    message: "Branch details are required when multi-branch is enabled",
    path: ["branch_name"]
}).refine((data) => {
    if (data.has_ipd) {
        return data.ipd_beds > 0
    }
    return true
}, {
    message: "At least 1 bed is required if IPD is enabled",
    path: ["ipd_beds"]
})

export async function saveLocationInfrastructure(prevState: LocationInfrastructureState, formData: FormData): Promise<LocationInfrastructureState> {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: 'Unauthorized access. Please login.' }
    }

    // Parse form data
    const rawData = {
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode'),

        is_multi_branch: formData.get('is_multi_branch') === 'on',
        branch_name: formData.get('branch_name'),
        branch_code: formData.get('branch_code'),

        consultation_rooms: formData.get('consultation_rooms'),
        therapy_rooms: formData.get('therapy_rooms'),

        has_ipd: formData.get('has_ipd') === 'on',
        ipd_beds: formData.get('ipd_beds'),
        bed_categories: formData.getAll('bed_categories'),
    }

    // Validate data
    const validated = locationInfrastructureSchema.safeParse(rawData)

    if (!validated.success) {
        return {
            error: 'Please fix the errors below.',
            fieldErrors: validated.error.flatten().fieldErrors
        }
    }

    // Update database
    const { error: dbError } = await supabase
        .from('hospitals')
        .update({
            ...validated.data,
            updated_at: new Date().toISOString()
        })
        .eq('admin_id', user.id)

    if (dbError) {
        console.error('Database Error:', dbError)
        return { error: 'Failed to update location details. Please try again.' }
    }

    // Redirect on success
    redirect('/onboarding/department')
}
