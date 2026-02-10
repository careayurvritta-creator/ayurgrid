'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type SecurityState = {
    message?: string
    error?: string
    fieldErrors?: Record<string, string[]>
    success?: boolean
}

const passwordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function changePassword(prevState: SecurityState, formData: FormData): Promise<SecurityState> {
    const supabase = await createClient()

    const rawData = {
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm_password') as string,
    }

    const validated = passwordSchema.safeParse(rawData)

    if (!validated.success) {
        return {
            error: 'Please fix the errors below.',
            fieldErrors: validated.error.flatten().fieldErrors
        }
    }

    const { error } = await supabase.auth.updateUser({
        password: validated.data.password
    })

    if (error) {
        return { error: error.message }
    }

    // Log the event
    await logSecurityEvent('password_change', 'User changed password during onboarding')

    return {
        success: true,
        message: 'Password updated successfully!'
    }
}

export async function skipSecurityStep() {
    // Log the skip
    await logSecurityEvent('security_skip', 'User skipped security setup')
    redirect('/onboarding/ipd')
}

export async function continueToNextStep() {
    redirect('/onboarding/ipd')
}

async function logSecurityEvent(eventType: string, details: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        await supabase.from('security_logs').insert({
            user_id: user.id,
            event_type: eventType,
            details: JSON.stringify({ message: details }),
            ip_address: 'unknown', // Capture real IP if possible via headers in future
            user_agent: 'unknown'
        })
    }
}
