import type { Route } from "next";
import { redirect } from "next/navigation";

export default function GuruSiswaPage() {
  redirect("/dashboard/guru/siswa" as Route);
}
