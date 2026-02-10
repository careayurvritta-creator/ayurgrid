import { createClient } from '@/utils/supabase/server'

export default async function DebugPage() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    let clientStatus = "Not Attempted"
    let clientError = null

    try {
        await createClient()
        clientStatus = "Success"
    } catch (e: any) {
        clientStatus = "Failed"
        clientError = e.message || String(e)
    }

    return (
        <div className="p-10 font-mono text-sm">
            <h1 className="text-xl font-bold mb-4">Debug Environment</h1>
            <div className="space-y-2">
                <div>
                    <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {url ? '✅ Present' : '❌ MISSING'}
                    {url ? ` (${url.length} chars)` : ''}
                </div>
                <div>
                    <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {key ? '✅ Present' : '❌ MISSING'}
                    {key ? ` (${key.length} chars)` : ''}
                </div>
                <div>
                    <strong>createClient() Status:</strong> {clientStatus}
                </div>
                {clientError && (
                    <div className="text-red-500">
                        <strong>Error:</strong> {clientError}
                    </div>
                )}
                <div className="mt-4 pt-4 border-t">
                    <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
                </div>
            </div>
        </div>
    )
}
