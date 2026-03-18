import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/invites">
        <button>招待ページへ</button>
      </Link>
      <Link href="/admin/invites">
        <button>管理者ページへ</button>
      </Link>
    </main>
  );
}
