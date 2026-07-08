import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminConsentPage() {
  redirect("/dashboard/admin/consent" as Route);
}
