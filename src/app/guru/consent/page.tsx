import type { Route } from "next";
import { redirect } from "next/navigation";

export default function GuruConsentPage() {
  redirect("/dashboard/guru/consent" as Route);
}
