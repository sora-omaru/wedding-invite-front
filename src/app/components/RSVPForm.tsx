"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InviteResponseDto } from "@/types/invite";
import { patchInvite, toAttendance } from "@/lib/api/invites";
import styles from "./RSVPForm.module.scss";
import { ALLERGY_FOOD, ALLERGY_NONE } from "./constans/allergies";

type Props = {
  token: string;
  initialInvite: InviteResponseDto;
};

export default function RSVPForm({ token, initialInvite }: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialInvite.name ?? "");
  const [allergiesList, setAllergiesList] = useState<string[]>(
    initialInvite.allergiesList ?? [],
  );
  const [attendance, setAttendance] = useState(
    String(initialInvite.attendance),
  ); // "0"|"1"|"2"

  const [companionsText, setCompanionsText] = useState(
    initialInvite.companionsText ?? "",
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isAllergyOpen, setIsAllergyOpen] = useState(
    (initialInvite.allergiesList ?? []).length > 0,
  );

  function toggleAllergy(value: string) {
    setAllergiesList((prev) => {
      const isChecked = prev.includes(value);

      if (value === ALLERGY_NONE) {
        if (isChecked) {
          return [];
        }
        return [ALLERGY_NONE];
      }
      const withoutNone = prev.filter((item) => item !== ALLERGY_NONE);

      if (isChecked) {
        return withoutNone.filter((item) => item !== value);
      }

      return [...withoutNone, value];
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await patchInvite(token, {
        attendance: toAttendance(attendance),
        name: name.trim() ? name.trim() : null,
        companionsText: companionsText.trim() ? companionsText.trim() : null,
        allergiesList,
      });

      router.refresh();
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

        <fieldset className={styles.allergyFieldset}>
          <legend className={styles.legend}>アレルギー</legend>

          <label className={styles.expander}>
            <input
              type="checkbox"
              checked={isAllergyOpen}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsAllergyOpen(checked);
                if (!checked) setAllergiesList([]);
              }}
            />
            <span>アレルギー選択欄</span>
          </label>

          <div
            className={`${styles.allergyPanel} ${isAllergyOpen ? styles.allergyPanelOpen : ""}`.trim()}
          >
            <div className={styles.allergyList}>
              {ALLERGY_FOOD.map((allergyFood) => (
                <label key={allergyFood.value} className={styles.allergyFood}>
                  <input
                    type="checkbox"
                    checked={allergiesList.includes(allergyFood.value)}
                    onChange={() => toggleAllergy(allergyFood.value)}
                  />
                  <span>{allergyFood.label}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

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
