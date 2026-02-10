import Link from 'next/link'

export default function DepartmentPlaceholder() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-3xl text-primary">grid_view</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Step 3: Department Configuration</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    This is a placeholder for the next onboarding step.
                </p>
                <Link
                    href="/dashboard"
                    className="block w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    )
}
