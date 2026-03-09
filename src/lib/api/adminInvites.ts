export type AdminInviteListItemDto = {
  inviteToken: string;
  name: string | null;
  attendance: number;
  companionsText: string | null;
  kidsText: string | null;
  createdAt: string;
  updatedAt: string;
  allergiesText: string | null;
};

function getAppOrigin(): string {
  const origin = process.env.NEXT_PUBLIC_APP_ORIGIN;
  if (!origin) throw new Error("NEXT_PUBLIC_APP_ORIGIN is missing");
  return origin.replace(/\/$/, "");
}

export async function fetchAdminInvites(): Promise<AdminInviteListItemDto[]> {
  const url = new URL("/api/admin/invites", getAppOrigin());

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`failed to fetch admin invites: ${res.status}`);

  const data: AdminInviteListItemDto[] = await res.json();
  return data;
}
