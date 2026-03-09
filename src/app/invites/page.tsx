"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

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
    <main className={styles.main}>
      <h1 className={styles.title}>招待ページ</h1>
      <p className={styles.description}>
        招待トークンを入力して、出欠回答ページを開いてください。
      </p>

      <form onSubmit={onSubmit} className={styles.form}>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="招待トークン"
          aria-label="招待トークン"
          className={styles.input}
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`${styles.button} ${isSubmitDisabled ? styles.buttonDisabled : ""}`.trim()}
        >
          招待を開く
        </button>
      </form>
    </main>
  );
}
