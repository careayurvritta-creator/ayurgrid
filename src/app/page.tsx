export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">AyurGrid PMS</h1>
      <p className="mt-4 text-xl text-muted-foreground">Ayurveda Practice Management System</p>

      <div className="mt-8">
        <a
          href="/login"
          className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
