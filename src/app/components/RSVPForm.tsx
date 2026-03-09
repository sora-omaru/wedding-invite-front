"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InviteResponseDto } from "@/types/invite";
import { patchInvite, toAttendance } from "@/lib/api/invites";
import styles from "./RSVPForm.module.scss";

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
    <section className={styles.section}>
      <h2 className={styles.title}>出欠のご回答</h2>

      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.field}>
          お名前
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          出欠
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className={styles.select}
          >
            <option value="0">未回答</option>
            <option value="1">出席</option>
            <option value="2">欠席</option>
          </select>
        </label>

        <label className={styles.field}>
          同伴者（自由入力）
          <input
            value={companionsText}
            onChange={(e) => setCompanionsText(e.target.value)}
            className={styles.input}
          />
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}

        <button
          type="submit"
          disabled={saving}
          className={`${styles.button} ${saving ? styles.buttonDisabled : ""}`.trim()}
        >
          {saving ? "送信中..." : "送信する"}
        </button>
      </form>
    </section>
  );
}
