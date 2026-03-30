import RSVPForm from "@/app/components/RSVPForm";
import { fetchInvite } from "@/lib/api/invites";
import styles from "./page.module.scss";
import { ALLERGY_FOOD } from "@/app/components/constans/allergies";
import Image from "next/image";

type Props = { params: { token: string } };

export default async function InvitePage({ params }: Props) {
  const invite = await fetchInvite(params.token);

  //Informationの内容
  const infoList = [
    { label: "日付", value: "2026年5月6日" },
    { label: "会場", value: "南青山サンタキアラ教会" },
    { label: "URL", value: "https://wedding.escrit.jp/place/santa-chiara/" },
    { label: "住所", value: "〒107-0062 東京都港区南青山５丁目５−２４" },
    { label: "TEL", value: " 0120-951-645" },
  ];

  //アレルギー情報変換（英語->日本語）
  const allergiesFood = invite.allergiesList
    .map(
      (allergies) =>
        ALLERGY_FOOD.find((allergy) => allergy.value === allergies)?.label ??
        allergies,
    )
    .join(",");

  return (
    <main className={styles.main}>
      <div className={styles.Introduce_content}>
        <h1 className={styles.IntroduceTitle_style}>Wedding Invitation</h1>
        <p className={styles.name_styles}>SORA　KAORI</p>
        <div className={styles.couple_img_style}>
          <Image
            src="/images/IMG_7897 (1).jpg"
            alt="新郎新婦"
            width={600}
            height={450}
            className={styles.coupleImage}
          />
        </div>
        <section className={styles.greeting}>
          <p className={styles.greetingTitle}>ご挨拶</p>

          <p className={styles.greetingText}>
            拝啓
            <p> このたび 私たちは結婚式を挙げる運びとなりました</p>
            <p> これまで支えてくださった皆さまへ感謝の気持ちを込めて</p>
            <p>ささやかな式ではありますが</p>
            <p> 晴れの日を皆さまとご一緒できましたら嬉しく思います</p>
            <p>おいそがしいところ恐れ入りますが</p>
            <p>ぜひご出席いただけましたら幸いです</p>
            敬具
          </p>
        </section>
      </div>

      <div>
        <h2>information</h2>
        <dl>
          {infoList.map((info) => (
            <>
              <dt key={info.label}>{info.label}</dt>
              <dd>{info.value}</dd>
            </>
          ))}
        </dl>
      </div>

      <div className={styles.map_img_style}>
         <Image
            src="/images/mapImg.png"
            alt="地図"
            width={600}
            height={450}
            className={styles.mapImage}
          />
      </div>
      <h2 className={styles.title}>結婚式のご案内</h2>

      <section className={styles.summary}>
        <p className={`${styles.summaryLine} ${styles.summaryLineFirst}`}>
          招待トークン: {invite.inviteToken}
        </p>
        <p className={styles.summaryLine}>お名前: {invite.name ?? "未入力"}</p>
        <p className={styles.summaryLine}>
          出欠:
          {invite.attendance === 1
            ? "出席"
            : invite.attendance === 2
              ? "欠席"
              : "未回答"}
        </p>
        <p className={styles.summaryLine}>
          同伴者: {invite.companionsText ?? "未入力"}
        </p>
        <p className={styles.summaryLine}>アレルギー情報: {allergiesFood}</p>
      </section>

      <div className={styles.spacer} />

      <RSVPForm token={params.token} initialInvite={invite} />
    </main>
  );
}
