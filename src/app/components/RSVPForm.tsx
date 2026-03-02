"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InviteResponseDto } from "@/types/invite";
import { patchInvite, toAttendance } from "@/lib/api/invites";

type Props = {
  token: string;
  initialInvite: InviteResponseDto;
};

export default function RSVPForm({ token, initialInvite }: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialInvite.name ?? "");
  const [attendance, setAttendance] = useState(String(initialInvite.attendance)); // "0"|"1"|"2"
  const [companionsText, setCompanionsText] = useState(initialInvite.companionsText ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await patchInvite(token, {
        attendance: toAttendance(attendance),
        name: name.trim() ? name.trim() : null,
        companionsText: companionsText.trim() ? companionsText.trim() : null,
      });

      router.refresh(); // サーバコンポーネント再取得
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h2 style={{ margin: 0, fontSize: 18 }}>出欠のご回答</h2>

      <form onSubmit={onSubmit} style={{ marginTop: 12, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          お名前
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          出欠
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          >
            <option value="0">未回答</option>
            <option value="1">出席</option>
            <option value="2">欠席</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          同伴者（自由入力）
          <input
            value={companionsText}
            onChange={(e) => setCompanionsText(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </label>

        {error ? <p style={{ margin: 0, color: "crimson" }}>{error}</p> : null}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #222",
            background: saving ? "#eee" : "#fff",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "送信中..." : "送信する"}
        </button>
      </form>
    </section>
  );
}