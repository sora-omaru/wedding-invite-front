import AdminClient from "./AdminClient";
import styles from "./page.module.scss";

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>管理者画面</h1>
      <p className={styles.description}>招待トークンを発行します。</p>
      <AdminClient />
    </main>
  );
}
