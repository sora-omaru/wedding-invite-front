"use server";

type AdminInviteResponse = {
  inviteToken: string;
  attendance: number;
  name: string | null;
  companionsText: string | null;
};

export async function createInvite(): Promise<AdminInviteResponse> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const user = process.env.ADMIN_BASIC_USERNAME;
  const pass = process.env.ADMIN_BASIC_PASSWORD;

  if (!apiBase) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  if (!user || !pass) throw new Error("ADMIN_BASIC_USERNAME/PASSWORD is not set");

  const basic = Buffer.from(`${user}:${pass}`).toString("base64");

  const res = await fetch(`${apiBase}/api/v1/admin/invites`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`admin create failed: ${res.status} ${text}`);
  }

  const data: AdminInviteResponse = await res.json();
  return data;
}