import RSVPForm from "@/app/components/RSVPForm";
import { fetchInvite } from "@/lib/api/invites";

type Props = { params: { token: string } };

export default async function InvitePage({ params }: Props) {
  const invite = await fetchInvite(params.token);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>結婚式のご案内</h1>

      <section style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
        <p style={{ margin: 0 }}>招待トークン: {invite.inviteToken}</p>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          お名前: {invite.name ?? "未入力"}
        </p>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          出欠: {invite.attendance === 1 ? "出席" : invite.attendance === 2 ? "欠席" : "未回答"}
        </p>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          同伴者: {invite.companionsText ?? "未入力"}
        </p>
      </section>

      <div style={{ height: 24 }} />

      <RSVPForm token={params.token} initialInvite={invite} />
    </main>
  );
}