import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkConnection() {
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1)

        // It's okay if 'users' table doesn't exist, we just check if connection is refused
        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
            console.error('❌ Supabase Connection Failed:', error.message)
        } else {
            console.log('✅ Supabase Connection Successful!')
            console.log(`   URL: ${supabaseUrl}`)
        }
    } catch (err) {
        console.error('❌ Unexpected Error:', err)
    }
}

checkConnection()
