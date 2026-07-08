import type { Route } from "next";
import { redirect } from "next/navigation";

export default function GuruSimulasiPage() {
  redirect("/dashboard/guru/simulasi" as Route);
}
