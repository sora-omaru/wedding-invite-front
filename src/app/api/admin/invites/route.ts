import { NextResponse } from "next/server";

function getEnv() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const user = process.env.ADMIN_BASIC_USERNAME;
  const pass = process.env.ADMIN_BASIC_PASSWORD;

  if (!apiBase) {
    return {
      error: NextResponse.json(
        { message: "API base missing" },
        { status: 500 },
      ),
    };
  }
  if (!user || !pass) {
    return {
      error: NextResponse.json(
        { message: "Admin creds missing" },
        { status: 500 },
      ),
    };
  }
  const basic = Buffer.from(`${user}:${pass}`).toString("base64");
  return { apiBase, basic };
}

export async function GET() {
  const env = getEnv();
  if ("error" in env) return env.error;

  const res = await fetch(`${env.apiBase}/api/v1/admin/invites`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${env.basic}`,
    },
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function POST() {
  const env = getEnv();
  if ("error" in env) return env.error;

  const res = await fetch(`${env.apiBase}/api/v1/admin/invites`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${env.basic}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}
