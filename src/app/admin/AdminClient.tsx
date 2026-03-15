"use client";

import { useState } from "react";

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
    <section style={{ marginTop: 12 }}>
      <button
        onClick={onCreate}
        style={{
          padding: 12,
          borderRadius: 10,
          border: "1px solid #222",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        招待を1件作成
      </button>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {created ? (
        <div
          style={{
            marginTop: 16,
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ margin: 0 }}>token: {created.inviteToken}</p>
          <p style={{ marginTop: 8, marginBottom: 0 }}>招待URL: {inviteUrl}</p>
          <button
            style={{
              marginTop: 8,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #333",
              background: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigator.clipboard.writeText(inviteUrl)}
          >
            URLをコピー
          </button>
        </div>
      ) : null}
    </section>
  );
}
