'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signupSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type SignupState = {
    error?: string
    fieldErrors?: Record<string, string[]>
    success?: boolean
}

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    }

    const validated = signupSchema.safeParse(rawData)

    if (!validated.success) {
        return {
            error: 'Please fix the errors below.',
            fieldErrors: validated.error.flatten().fieldErrors
        }
    }

    const supabase = await createClient()

    // Sign up with Supabase Auth
    // We redirect to /auth/verify to handle OTP verification immediately after signup
    // If email confirmation is enabled, Supabase sends a magic link or OTP.
    // We assume OTP flow here based on Page 2 implementation.
    const { data, error } = await supabase.auth.signUp({
        email: validated.data.email,
        password: validated.data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        }
    })

    if (error) {
        return { error: error.message }
    }

    // If signup is successful, we redirect to the OTP verification page
    // passing the email so the user doesn't have to re-type it.
    // Note: If email confirmation is required, the user won't be able to login yet.
    // Page 2 (Verify OTP) handles the verification.
    if (data.user) {
        // If identifying key is user ID (unlikely for OTP input), specific logic might be needed.
        // Usually signUp sends the OTP to the email.
        // We redirect to /auth/verify?email=...
        redirect(`/auth/verify?email=${encodeURIComponent(validated.data.email)}`)
    }

    return { error: "Something went wrong. Please try again." }
}
