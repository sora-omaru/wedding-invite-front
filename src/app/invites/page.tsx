"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const styles = {
  main: { maxWidth: 560, margin: "0 auto", padding: 16 },
  title: { margin: 0, fontSize: 22 },
  description: { marginTop: 8, marginBottom: 0 },
  form: { marginTop: 16, display: "grid", gap: 10 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: 10, borderRadius: 8, border: "1px solid #222" },
};

export default function InvitesEntryPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const trimmedToken = token.trim();
  const isSubmitDisabled = !trimmedToken;

  function openInvite(tokenValue: string) {
    router.push(`/invites/${encodeURIComponent(tokenValue)}`);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitDisabled) return;
    openInvite(trimmedToken);
  }

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>招待ページ</h1>
      <p style={styles.description}>
        招待トークンを入力して、出欠回答ページを開いてください。
      </p>

      <form onSubmit={onSubmit} style={styles.form}>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="招待トークン"
          aria-label="招待トークン"
          style={styles.input}
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          style={{
            ...styles.button,
            background: isSubmitDisabled ? "#eee" : "#fff",
            cursor: isSubmitDisabled ? "not-allowed" : "pointer",
          }}
        >
          招待を開く
        </button>
      </form>
    </main>
  );
}
