"use client";

import { useActionState } from "react";
import { requestMagicLink, type LoginState } from "@/app/actions/auth";

const CREAM = "#f3ecd9";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";

export function LoginForm({ defaultEmail }: { defaultEmail?: string }) {
  const [state, action, pending] = useActionState<LoginState | undefined, FormData>(
    requestMagicLink,
    undefined,
  );

  if (state && "ok" in state && state.ok) {
    return <SentConfirmation email={state.email} />;
  }

  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span
          className="block text-[10px] uppercase"
          style={{ letterSpacing: "0.32em", color: CLAY, opacity: 0.85 }}
        >
          Email
        </span>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          defaultValue={defaultEmail}
          placeholder="ton@email.fr"
          className="mt-3 block w-full border-b bg-transparent py-2.5 text-[15px] outline-none placeholder:opacity-50 focus:border-b-2"
          style={{
            borderColor: HAIRLINE,
            color: INK_WARM,
          }}
        />
      </label>

      {state && "error" in state && state.error && (
        <p className="text-[13px]" style={{ color: "#9a2a1d" }}>
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-3 px-7 py-3.5 text-[10px] uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{
          background: "#3a2415",
          color: CREAM,
          letterSpacing: "0.3em",
          borderRadius: 2,
        }}
      >
        {pending ? "Envoi en cours…" : "M'envoyer un lien"}
        {!pending && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </button>
    </form>
  );
}

function SentConfirmation({ email }: { email: string }) {
  return (
    <div className="space-y-5">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border"
        style={{ borderColor: HAIRLINE, color: CLAY }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </div>
      <div className="text-center">
        <h3
          className="text-3xl leading-[1.1]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontStyle: "italic",
            color: INK_WARM,
          }}
        >
          Vérifie tes emails.
        </h3>
        <p className="mt-3 text-[14px] leading-[1.65] text-zinc-700">
          Si <span className="font-mono" style={{ color: INK_WARM }}>{email}</span>
          {" "}correspond à un compte, un lien vient d&apos;y être envoyé.
        </p>
      </div>
      <div
        className="border-t pt-4 text-center text-[11px] leading-[1.6]"
        style={{ borderColor: HAIRLINE, color: INK_WARM, opacity: 0.7 }}
      >
        Le lien expire dans 15 minutes et n&apos;est utilisable qu&apos;une seule fois.
      </div>
    </div>
  );
}
