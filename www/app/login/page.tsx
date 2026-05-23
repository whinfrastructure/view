import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const { error, email } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Connexion</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">Bienvenue.</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Reçois un lien de connexion par email — pas de mot de passe.
        </p>

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6">
          <LoginForm defaultEmail={email ?? ""} />
        </div>

        <p className="mt-8 text-xs text-zinc-500">
          Le lien expire dans 15 minutes et n&apos;est utilisable qu&apos;une seule fois.
        </p>
      </div>
    </main>
  );
}
