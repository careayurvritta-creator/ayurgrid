'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address')
})

const resetSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, 'Code must be 6 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type RecoveryState = {
    message?: string
    error?: string
    step?: 'code_sent' | 'success'
}

export async function sendRecoveryCode(prevState: RecoveryState, formData: FormData): Promise<RecoveryState> {
    const email = formData.get('email') as string

    const validated = emailSchema.safeParse({ email })

    if (!validated.success) {
        return { error: validated.error.issues[0].message }
    }

    const supabase = await createClient()

    // Use signInWithOtp to send a code. 
    // This effectively logs them in to reset their password.
    const { error } = await supabase.auth.signInWithOtp({
        email: validated.data.email,
        options: {
            shouldCreateUser: false // Only allow existing users to recover
        }
    })

    if (error) {
        console.error('Recovery error:', error)
        return { error: error.message }
    }

    return { message: 'Verification code sent', step: 'code_sent' }
}

export async function resetPassword(prevState: RecoveryState, formData: FormData): Promise<RecoveryState> {
    const email = formData.get('email') as string
    const code = formData.get('code') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    const validated = resetSchema.safeParse({ email, code, password, confirmPassword })

    if (!validated.success) {
        return { error: validated.error.errors[0].message, step: 'code_sent' }
    }

    const supabase = await createClient()

    // 1. Verify the OTP
    const { data: { session }, error: verifyError } = await supabase.auth.verifyOtp({
        email: validated.data.email,
        token: validated.data.code,
        type: 'email'
    })

    if (verifyError) {
        return { error: verifyError.message, step: 'code_sent' }
    }

    if (!session) {
        return { error: 'Session verification failed', step: 'code_sent' }
    }

    // 2. Update Password associated with the session
    const { error: updateError } = await supabase.auth.updateUser({
        password: validated.data.password
    })

    if (updateError) {
        return { error: updateError.message, step: 'code_sent' }
    }

    // Success - redirect is handled effectively by the calling page or here
    // But we are in a server action. Redirect throws.
    // We want to return success so the UI can show a success message or redirect.
    // Let's redirect to login with a success param.
    redirect('/login?reset=success')
}
