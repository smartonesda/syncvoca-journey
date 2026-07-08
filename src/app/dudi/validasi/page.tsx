import type { Route } from "next";
import { redirect } from "next/navigation";

export default function DudiValidasiPage() {
  redirect("/dashboard/dudi/validasi" as Route);
}
