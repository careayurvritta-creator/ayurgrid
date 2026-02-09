'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const verifySchema = z.object({
    email: z.string().email(),
    token: z.string().length(6, "OTP must be 6 digits")
})

export async function verifyOtp(data: z.infer<typeof verifySchema>) {
    const result = verifySchema.safeParse(data);
    if (!result.success) {
        return { error: "Invalid code format" };
    }

    const supabase = await createClient()

    // Attempt to verify as 'email' (login) first, or we could expose type selection
    // For this generic implementation, we'll assume standard Email OTP login
    const { error } = await supabase.auth.verifyOtp({
        email: data.email,
        token: data.token,
        type: 'email'
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}
