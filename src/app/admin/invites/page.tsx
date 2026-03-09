import { fetchAdminInvites } from "@/lib/api/adminInvites";
import styles from "./page.module.scss";

function attendanceLabel(a: number): string {
  if (a === 0) return "未回答";
  if (a === 1) return "出席";
  if (a === 2) return "欠席";
  return "不明";
}

function formatJst(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}

export default async function AdminInvitesPage() {
  const invites = await fetchAdminInvites();

  const pending = invites.filter((i) => i.attendance === 0).length;
  const attending = invites.filter((i) => i.attendance === 1).length;
  const absent = invites.filter((i) => i.attendance === 2).length;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>招待一覧（管理）</h1>

      <section className={styles.summaryCard}>
        <p className={styles.summaryText}>
          合計: {invites.length} / 未回答: {pending} / 出席: {attending} / 欠席: {absent}
        </p>
      </section>

      <div className={styles.spacer} />

      <section className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headCell}>名前</th>
                <th className={styles.headCell}>出欠</th>
                <th className={styles.headCell}>同伴者</th>
                <th className={styles.headCell}>トークン</th>
                <th className={styles.headCell}>更新日時</th>
              </tr>
            </thead>
            <tbody>
              {invites.map((i) => (
                <tr key={i.inviteToken}>
                  <td className={styles.bodyCell}>{i.name ?? "未入力"}</td>
                  <td className={styles.bodyCell}>{attendanceLabel(i.attendance)}</td>
                  <td className={styles.bodyCell}>{i.companionsText ?? "未入力"}</td>
                  <td className={`${styles.bodyCell} ${styles.tokenCell}`}>{i.inviteToken}</td>
                  <td className={styles.bodyCell}>{formatJst(i.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
