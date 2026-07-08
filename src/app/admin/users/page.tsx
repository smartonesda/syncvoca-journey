import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminUsersPage() {
  redirect("/dashboard/admin/users" as Route);
}
