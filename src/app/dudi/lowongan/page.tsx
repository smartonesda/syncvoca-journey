import type { Route } from "next";
import { redirect } from "next/navigation";

export default function DudiLowonganPage() {
  redirect("/dashboard/dudi/lowongan" as Route);
}
