//フォームの入力API
import { Attendance, InviteResponseDto, InviteUpdateRequestDto } from "@/types/invite";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

export function toAttendance(value: string): Attendance {
  if (value === "0") return 0;
  if (value === "1") return 1;
  return 2;
}

export async function fetchInvite(token: string): Promise<InviteResponseDto> {
  const res = await fetch(`${baseUrl}/api/v1/invites/${encodeURIComponent(token)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`fetchInvite failed: ${res.status}`);

  const data: InviteResponseDto = await res.json();
  return data;
}

export async function patchInvite(
  token: string,
  body: InviteUpdateRequestDto
): Promise<InviteResponseDto> {
  const res = await fetch(`${baseUrl}/api/v1/invites/${encodeURIComponent(token)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`patchInvite failed: ${res.status}`);

  const data: InviteResponseDto = await res.json();
  return data;
}