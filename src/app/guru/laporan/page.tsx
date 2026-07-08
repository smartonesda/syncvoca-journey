import type { Route } from "next";
import { redirect } from "next/navigation";

export default function GuruLaporanPage() {
  redirect("/dashboard/guru/laporan" as Route);
}
