"use client";

import { useActionState } from "react";
import { requestMagicLink, type LoginState } from "@/app/actions/auth";

export function LoginForm({ defaultEmail }: { defaultEmail?: string }) {
  const [state, action, pending] = useActionState<LoginState | undefined, FormData>(
    requestMagicLink,
    undefined,
  );

  if (state && "ok" in state && state.ok) {
    return <SentConfirmation email={state.email} />;
  }

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          defaultValue={defaultEmail}
          placeholder="vous@exemple.com"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100"
        />
      </div>

      {state && "error" in state && state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {pending ? "Envoi…" : "M'envoyer un lien de connexion"}
      </button>
    </form>
  );
}

function SentConfirmation({ email }: { email: string }) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-zinc-900">Vérifie tes emails</h3>
        <p className="mt-2 text-sm text-zinc-600">
          Si <span className="font-mono text-zinc-900">{email}</span> correspond à un compte,
          un lien vient d&apos;y être envoyé.
        </p>
      </div>
      <p className="text-xs text-zinc-500">
        Le lien expire dans 15 minutes et n&apos;est utilisable qu&apos;une seule fois.
      </p>
    </div>
  );
}
