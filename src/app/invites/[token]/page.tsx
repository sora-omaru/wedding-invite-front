import RSVPForm from "@/app/components/RSVPForm";
import { fetchInvite } from "@/lib/api/invites";
import styles from "./page.module.scss";

type Props = { params: { token: string } };

export default async function InvitePage({ params }: Props) {
  const invite = await fetchInvite(params.token);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>結婚式のご案内</h1>

      <section className={styles.summary}>
        <p className={`${styles.summaryLine} ${styles.summaryLineFirst}`}>招待トークン: {invite.inviteToken}</p>
        <p className={styles.summaryLine}>
          お名前: {invite.name ?? "未入力"}
        </p>
        <p className={styles.summaryLine}>
          出欠: {invite.attendance === 1 ? "出席" : invite.attendance === 2 ? "欠席" : "未回答"}
        </p>
        <p className={styles.summaryLine}>
          同伴者: {invite.companionsText ?? "未入力"}
        </p>
      </section>

      <div className={styles.spacer} />

      <RSVPForm token={params.token} initialInvite={invite} />
    </main>
  );
}
