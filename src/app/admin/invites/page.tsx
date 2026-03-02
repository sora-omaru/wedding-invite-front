import { fetchAdminInvites } from "@/lib/api/adminInvites";

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
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>招待一覧（管理）</h1>

      <section style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
        <p style={{ margin: 0 }}>
          合計: {invites.length} / 未回答: {pending} / 出席: {attending} / 欠席: {absent}
        </p>
      </section>

      <div style={{ height: 12 }} />

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px 0" }}>名前</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px 0" }}>出欠</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px 0" }}>同伴者</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px 0" }}>トークン</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px 0" }}>更新日時</th>
            </tr>
          </thead>
          <tbody>
            {invites.map((i) => (
              <tr key={i.inviteToken}>
                <td style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>{i.name ?? "未入力"}</td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>{attendanceLabel(i.attendance)}</td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>{i.companionsText ?? "未入力"}</td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", fontFamily: "monospace" }}>{i.inviteToken}</td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>{formatJst(i.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}