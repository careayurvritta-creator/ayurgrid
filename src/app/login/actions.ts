'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function login(data: z.infer<typeof loginSchema>) {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return { error: "Invalid data format" };
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}
