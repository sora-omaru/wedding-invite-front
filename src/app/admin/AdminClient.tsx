"use client";

import { useState } from "react";
import styles from "./AdminClient.module.scss";

type InviteResponseDto = {
  inviteToken: string;
  attendance: number;
  name: string | null;
  companionsText: string | null;
  allergiesList: string[];
};

export default function AdminClient() {
  const [created, setCreated] = useState<InviteResponseDto | null>(null);
  const [error, setError] = useState("");

  const appBase =
    process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000";

  async function onCreate() {
    setError("");
    setCreated(null);

    try {
      const res = await fetch("/api/admin/invites", { method: "POST" });
      if (!res.ok) throw new Error(`create failed: ${res.status}`);
      const data: InviteResponseDto = await res.json();
      setCreated(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "failed");
    }
  }

  const inviteUrl = created ? `${appBase}/invites/${created.inviteToken}` : "";

  return (
    <section className={styles.section}>
      <button onClick={onCreate} className={styles.primaryButton}>
        招待を1件作成
      </button>

      {error ? <p className={styles.error}>{error}</p> : null}

      {created ? (
        <div className={styles.resultCard}>
          <p className={styles.resultLine}>token: {created.inviteToken}</p>
          <p className={styles.resultUrl}>招待URL: {inviteUrl}</p>
          <button
            className={styles.secondaryButton}
            onClick={() => navigator.clipboard.writeText(inviteUrl)}
          >
            URLをコピー
          </button>
        </div>
      ) : null}
    </section>
  );
}
