import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16, display: "grid", gap: 12 }}>
      <Link href="/invites">
        <button>招待ページへ</button>
      </Link>
      <Link href="/admin/invites">
        <button>管理者ページへ</button>
      </Link>
    </main>
  );
}
