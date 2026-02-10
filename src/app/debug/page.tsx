export default async function DebugPage() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    return (
        <div className="p-10 font-mono text-sm space-y-4">
            <h1 className="text-xl font-bold">Debug Environment</h1>

            <div className="p-4 border rounded bg-gray-50">
                <div className="mb-2">
                    <strong>NEXT_PUBLIC_SUPABASE_URL:</strong><br />
                    {url ? `✅ Present (${url.length} chars)` : '❌ MISSING'}
                    <div className="text-xs text-gray-500 mt-1">{url}</div>
                </div>

                <div>
                    <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong><br />
                    {key ? `✅ Present (${key.length} chars)` : '❌ MISSING'}
                    <div className="text-xs text-gray-500 mt-1">{key ? key.substring(0, 10) + '...' : ''}</div>
                </div>
            </div>

            <div className="p-4 border rounded bg-gray-50">
                <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
            </div>
        </div>
    )
}
