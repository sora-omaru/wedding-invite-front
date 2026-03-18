"use client"

import { ColumnDef } from "@tanstack/react-table"
import styles from "./columns.module.scss"

export type AdminInviteRow = {
  inviteToken: string
  name: string | null
  attendance: number
  allergiesText: string | null
  companionsText: string | null
  updatedAt: string
}

function attendanceLabel(attendance: number): string {
  switch (attendance) {
    case 1:
      return "出席"
    case 2:
      return "欠席"
    default:
      return "未回答"
  }
}

function formatJst(value: string): string {
  if (!value) return "-"

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const columns: ColumnDef<AdminInviteRow>[] = [
  {
    accessorKey: "name",
    header: "名前",
    cell: ({ row }) => {
      return row.original.name ?? "未入力"
    },
  },
  {
    accessorKey: "attendance",
    header: "出欠",
    cell: ({ row }) => {
      return attendanceLabel(row.original.attendance)
    },
  },
  {
    accessorKey: "allergiesText",
    header: "アレルギー情報",
    cell: ({ row }) => {
      return row.original.allergiesText ?? "未入力"
    },
  },
  {
    accessorKey: "companionsText",
    header: "同伴者",
    cell: ({ row }) => {
      return row.original.companionsText ?? "未入力"
    },
  },
  {
    accessorKey: "inviteToken",
    header: "トークン",
    cell: ({ row }) => {
      return <span className={styles.token}>{row.original.inviteToken}</span>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "更新日時",
    cell: ({ row }) => {
      return formatJst(row.original.updatedAt)
    },
  },
]
