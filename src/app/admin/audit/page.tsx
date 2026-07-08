import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminAuditPage() {
  redirect("/dashboard/admin/audit" as Route);
}
