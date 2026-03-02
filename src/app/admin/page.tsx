import AdminClient from "./AdminClient";

export default function AdminPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>管理者画面</h1>
      <p style={{ marginTop: 8 }}>招待トークンを発行します。</p>
      <AdminClient />
    </main>
  );
}