'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Validation Schema
const clinicIdentitySchema = z.object({
    name: z.string().min(3, 'Clinic name is required').max(100),
    type: z.enum(['opd', 'panchkarma', 'hospital', 'wellness']),
    reg_number: z.string().optional(),
    doctor_name: z.string().min(3, 'Doctor name is required'),
    doctor_reg_number: z.string().min(3, 'Registration number is required'),
    mobile: z.string().min(10, 'Valid mobile number is required'),
    email: z.string().email('Valid email is required'),
    website: z.string().url().optional().or(z.literal('')),
    legal_confirmation: z.boolean().refine(val => val === true, 'You must confirm legal ownership'),
})

export type IdentityState = {
    message?: string
    error?: string
    fieldErrors?: Record<string, string[]>
}

export async function saveClinicIdentity(prevState: IdentityState, formData: FormData): Promise<IdentityState> {
    const supabase = await createClient()

    // 1. Get User
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: 'Unauthorized. Please login again.' }
    }

    // 2. Extract Data
    const rawData = {
        name: formData.get('clinic_name'),
        type: formData.get('clinic_type'),
        reg_number: formData.get('reg_number'),
        doctor_name: formData.get('doctor_name'),
        doctor_reg_number: formData.get('doc_reg_number'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
        website: formData.get('website'), // Optional if added to UI later
        legal_confirmation: formData.get('legal_confirmation') === 'on',
    }

    // 3. Validate
    const validated = clinicIdentitySchema.safeParse(rawData)

    if (!validated.success) {
        return {
            error: 'Please fix the errors below.',
            fieldErrors: validated.error.flatten().fieldErrors
        }
    }

    // 4. Handle Logo Upload (if present)
    const logoFile = formData.get('logo') as File | null
    let logoUrl = null
    let logoPath = null

    if (logoFile && logoFile.size > 0) {
        // Validation: Check file type and size (e.g., max 2MB)
        if (logoFile.size > 2 * 1024 * 1024) {
            return { error: 'Logo file size must be less than 2MB' }
        }
        if (!logoFile.type.startsWith('image/')) {
            return { error: 'Logo must be an image file' }
        }

        const fileExt = logoFile.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('hospital-logos')
            .upload(filePath, logoFile)

        if (uploadError) {
            console.error('Logo upload error:', uploadError)
            return { error: 'Failed to upload logo. Please try again.' }
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from('hospital-logos')
            .getPublicUrl(filePath)

        logoUrl = publicUrlData.publicUrl
        logoPath = filePath
    }

    // 5. Upsert into DB
    const { error: dbError } = await supabase.from('hospitals').upsert({
        admin_id: user.id,
        ...validated.data,
        ...(logoUrl ? { logo_url: logoUrl, logo_path: logoPath } : {}),
        updated_at: new Date().toISOString()
    }, {
        onConflict: 'admin_id'
    })

    if (dbError) {
        console.error('DB Error:', dbError)
        return { error: 'Failed to save clinic details. ' + dbError.message }
    }

    // 6. Redirect to Next Step
    redirect('/onboarding/location')
}
